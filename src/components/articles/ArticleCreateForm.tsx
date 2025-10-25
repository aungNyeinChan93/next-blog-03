"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
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
import { ArticleSchema, type Article } from "@/lib/zod-schemas/aarticle-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { createArticleAction } from "@/features/articles/article-actions";
import { useRouter } from "next/navigation";

const ArticleCreateForm = () => {
  const router = useRouter();
  const { data } = useSession();
  const author_id = data?.user?.id || "";
  const form = useForm<Article>({
    defaultValues: {
      title: "",
      body: "",
    },
    resolver: zodResolver(ArticleSchema),
  });

  const articleCreateSubmit = async (data: Article) => {
    const {
      success,
      data: fields,
      error,
    } = await ArticleSchema.safeParseAsync(data);

    if (!success) {
      toast.error(
        error instanceof Error ? error?.message : "Article create fail"
      );
      return;
    }

    try {
      const newArticleId = await createArticleAction(fields, author_id);
      if (newArticleId != null) {
        form.reset();
        toast.success("Artcle successfully created!", { duration: 3000 });
        router.refresh();
        return router.push("/articles");
      }
    } catch (error) {
      console.error(error instanceof Error ? error?.message : "server err");
    }
  };
  return (
    <React.Fragment>
      <Card className="w-full max-w-lg px-4">
        <form onSubmit={form.handleSubmit(articleCreateSubmit)}>
          <CardHeader>
            <CardTitle className="text-center text-xl text-indigo-500">
              Articel Create Form
            </CardTitle>
          </CardHeader>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <FieldError
                      errors={[{ message: fieldState.error?.message }]}
                    />
                    <FieldDescription>Enter Your Title</FieldDescription>
                    <Input
                      id={field.name}
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="h-12"
                      type="text"
                      placeholder="Title ... "
                    />
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Body</FieldLabel>
                    <FieldError
                      errors={[{ message: fieldState.error?.message }]}
                    />
                    <FieldDescription>Enter Your Body</FieldDescription>
                    <Textarea
                      id={field.name}
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="h-40"
                      placeholder="Body ... "
                    />
                  </FieldContent>
                </Field>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isLoading}
              variant={"outline"}
            >
              {form.formState.isLoading ? "Loading ... " : "Save"}
            </Button>
          </FieldGroup>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default ArticleCreateForm;
