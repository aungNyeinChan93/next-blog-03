"use client";

import React from "react";
import { Card } from "../ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, PostSchema } from "@/lib/zod-schemas/posts-schema";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { createPostAction } from "@/features/posts/posts-actions";
import { ServerSession } from "@/features/auth/auth";
import { useRouter } from "next/navigation";

interface Props {
  session?: ServerSession;
}

const PostCreateForm = ({ session }: Props) => {
  const router = useRouter();
  const user_id = session && session?.user?.id;
  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm<Post>({
    defaultValues: {
      title: "",
      body: "",
    },
    resolver: zodResolver(PostSchema),
  });

  const createPostSubmit = async (data: Post) => {
    const {
      success,
      data: fields,
      error,
    } = await PostSchema.safeParseAsync(data);

    if (!success) {
      toast.error("Post Create Fail", { duration: 3000 });
      return;
    }
    try {
      const newPostId = await createPostAction(fields, user_id!);
      if (newPostId !== null) {
        toast.success("Post Create Success!");
        router.refresh();
        return router.push("/posts");
      }
    } catch (error) {
      console.error(error instanceof Error ? error?.message : "server error");
    }
  };

  return (
    <React.Fragment>
      <main className="w-full max-w-xl">
        <form onSubmit={handleSubmit(createPostSubmit)}>
          <Card className=" px-4 ">
            <FieldGroup>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        {field.name.toUpperCase()}
                      </FieldLabel>
                      <FieldDescription>Enter Your Title</FieldDescription>
                      {fieldState.error && (
                        <FieldError
                          errors={[{ message: fieldState.error.message }]}
                        />
                      )}
                      <Input
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        {...field}
                        type="text"
                        placeholder="Enter Title"
                      />
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="body"
                control={control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        {field.name.toUpperCase()}
                      </FieldLabel>
                      {fieldState.error && (
                        <FieldError
                          errors={[{ message: fieldState.error.message }]}
                        />
                      )}
                      <Input
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        {...field}
                        type="text"
                        placeholder="Enter Body"
                      />
                    </FieldContent>
                  </Field>
                )}
              />
              <Button type="submit" variant={"outline"}>
                Save
              </Button>
            </FieldGroup>
          </Card>
        </form>
      </main>
    </React.Fragment>
  );
};

export default PostCreateForm;
