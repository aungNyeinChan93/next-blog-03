"use client";

import { Todo, TodoSchema } from "@/lib/zod-schemas/todo-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { db } from "@/db/drizzle";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { createTodoAction } from "@/features/todos/todos-actions";

const CreateTodoForm = () => {
  const router = useRouter();
  const { data } = useSession();
  const user_id = data?.user?.id;

  const {
    reset,
    handleSubmit,
    formState: { errors, isLoading },
    control,
  } = useForm<Todo>({
    defaultValues: {
      task: "",
      isCompleted: false,
    },
    resolver: zodResolver(TodoSchema),
  });

  const createTodo = async (data: Todo) => {
    const {
      success,
      data: fields,
      error,
    } = await TodoSchema.safeParseAsync(data);

    if (!success) {
      toast.error("Todo Cretae Fail!");
      return;
    }

    const result = await createTodoAction(fields, user_id!);

    if (result !== null) {
      reset();
      toast.success(`To do ${result?.id} was successfully created!`);
      router.refresh();
      router.push("/todos");
      return;
    }
  };

  return (
    <React.Fragment>
      <main className="bg-white w-full max-w-xl p-4 rounded-lg shadow ">
        <form onSubmit={handleSubmit(createTodo)}>
          <FieldGroup>
            <Controller
              control={control}
              name="task"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>
                      {field.name.toUpperCase()}
                    </FieldLabel>
                    {errors && (
                      <FieldError
                        className=" capitalize  "
                        errors={[{ message: fieldState.error?.message }]}
                      />
                    )}
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="h-11"
                      type="text"
                      placeholder="Enter Your Task"
                    />
                  </FieldContent>
                </Field>
              )}
            />
            <Button disabled={isLoading} type="submit" variant={"outline"}>
              {isLoading ? "Loading ..." : "Save"}
            </Button>
          </FieldGroup>
        </form>
      </main>
    </React.Fragment>
  );
};

export default CreateTodoForm;
