"use client";

import { TestSchema, TestType } from "@/lib/zod-schemas/test-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Card } from "../ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { email } from "zod";

const FieldTestForm = () => {
  const form = useForm<TestType>({
    defaultValues: {
      name: "",
      notification: {
        email: false,
        phone: false,
        sms: false,
      },
      users: [{ email: "" }],
    },
    resolver: zodResolver(TestSchema),
  });

  const {
    fields: users,
    append: addUser,
    remove: removeUser,
  } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const testSubmit = async (data: TestType) => {
    const {
      success,
      data: fields,
      error,
    } = await TestSchema.safeParseAsync(data);
    if (!success) {
      alert(JSON.stringify(error, null, 2));
      return;
    }
    alert(JSON.stringify(fields, null, 2));
  };
  return (
    <React.Fragment>
      <Card className="px-4 w-full max-w-lg">
        <form onSubmit={form.handleSubmit(testSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <FieldDescription>Enter Your Name</FieldDescription>
                    <FieldError
                      className=" capitalize"
                      errors={[{ message: fieldState.error?.message }]}
                    />
                  </FieldContent>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Enter your name"
                  />
                </Field>
              )}
            />

            <FieldSet>
              <FieldContent>
                <FieldLegend>Notification</FieldLegend>
                <FieldDescription>
                  Select How you would like to notification recieved!
                </FieldDescription>
              </FieldContent>
              <FieldGroup data-slot={"checkbox-group"}>
                <div className="flex p-2">
                  <Controller
                    name="notification.sms"
                    control={form.control}
                    render={({
                      field: { value, onChange, ...field },
                      fieldState,
                    }) => (
                      <Field
                        data-invalid={fieldState.error}
                        orientation={"horizontal"}
                      >
                        <Checkbox
                          id={field.name}
                          {...field}
                          aria-invalid={fieldState.invalid}
                          checked={value}
                          onCheckedChange={onChange}
                        />
                        <FieldContent>
                          <FieldError
                            errors={[{ message: fieldState.error?.message }]}
                          />
                          <FieldLabel htmlFor={field.name}>SMS</FieldLabel>
                        </FieldContent>
                      </Field>
                    )}
                  />
                  <Controller
                    name="notification.phone"
                    control={form.control}
                    render={({
                      field: { value, onChange, ...field },
                      fieldState,
                    }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation={"horizontal"}
                      >
                        <Checkbox
                          id={field.name}
                          {...field}
                          aria-invalid={fieldState.invalid}
                          checked={value}
                          onCheckedChange={onChange}
                        />
                        <FieldContent>
                          <FieldError
                            errors={[{ message: fieldState.error?.message }]}
                          />
                          <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        </FieldContent>
                      </Field>
                    )}
                  />
                  <Controller
                    name="notification.email"
                    control={form.control}
                    render={({
                      field: { value, onChange, ...field },
                      fieldState,
                    }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation={"horizontal"}
                      >
                        <Checkbox
                          id={field.name}
                          {...field}
                          aria-invalid={fieldState.invalid}
                          checked={value}
                          onCheckedChange={onChange}
                        />
                        <FieldContent>
                          <FieldError
                            errors={[{ message: fieldState.error?.message }]}
                          />
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        </FieldContent>
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <div className="flex justify-between">
                <FieldContent>
                  <FieldLegend variant="label">Add User Email </FieldLegend>
                  <FieldDescription>
                    Add user email for your team!
                  </FieldDescription>
                  <FieldError
                    errors={[
                      { message: form.formState?.errors?.users?.root?.message },
                    ]}
                  />
                </FieldContent>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => addUser({ email: "" })}
                >
                  Add user
                </Button>
              </div>
              <FieldGroup>
                {users?.map((user, idx) => (
                  <Controller
                    name={`users.${idx}.email`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldError
                          errors={[{ message: fieldState.error?.message }]}
                        />
                        <div className="flex  gap-2">
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            type="text"
                            placeholder="Enter your name"
                          />
                          <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => removeUser(idx)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Field>
                    )}
                  />
                ))}
              </FieldGroup>
            </FieldSet>
            <Button type="submit" variant={"default"}>
              Save
            </Button>
          </FieldGroup>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default FieldTestForm;
