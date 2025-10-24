"use client";

import React from "react";
import { Card } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { Category, CategorySchema } from "@/lib/zod-schemas/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { createCategoryAction } from "@/features/categories/category-actions";
import { useRouter } from "next/navigation";

const CategoryCreateForm = () => {
  const router = useRouter();
  const form = useForm<Category>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(CategorySchema),
  });

  const categoryCreateSubmit = async (data: Category) => {
    const {
      success,
      data: fields,
      error,
    } = await CategorySchema.safeParseAsync(data);

    if (!success) {
      toast.error(error instanceof Error ? error?.message : "server error");
      return;
    }

    try {
      const newCategoryId = await createCategoryAction(fields);
      if (newCategoryId !== null) {
        toast.success("category successfully created");
        form.reset();
        router.refresh();
        return router.push("/categories");
      }
    } catch (error) {
      console.error(
        error instanceof Error ? error?.message : "category create err"
      );
    }
  };

  return (
    <React.Fragment>
      <main className="w-full px-4 mt-10">
        <Card className="p-2">
          <form onSubmit={form.handleSubmit(categoryCreateSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <FieldDescription> Your Category Name</FieldDescription>
                      <FieldError
                        errors={[{ message: fieldState.error?.message }]}
                      />
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className="h-14"
                        type="text"
                        placeholder="Enter Your Category Name"
                      />
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <FieldDescription> Your Desc Here</FieldDescription>
                      <FieldError
                        errors={[{ message: fieldState.error?.message }]}
                      />
                      <Textarea
                        {...field}
                        value={field.value || ""}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className="h-60 "
                        placeholder="Enter Your Category Desc"
                      />
                    </FieldContent>
                  </Field>
                )}
              />
              <Button type="submit" variant={"outline"}>
                Create Cateory
              </Button>
            </FieldGroup>
          </form>
        </Card>
      </main>
    </React.Fragment>
  );
};

export default CategoryCreateForm;
