"use client";

import { authClient } from "@/lib/auth-client";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "@/lib/zod-schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  async function registerSubmit(data: RegisterSchemaType) {
    await authClient.signUp.email({
      ...data,
      callbackURL: "/",
      fetchOptions: {
        onSuccess: (ctx: unknown) => {
          toast.success("register success", { duration: 3000 });
          return router.push("/");
        },
      },
    });
  }
  return (
    <React.Fragment>
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold text-center">Register Form</h1>

          <form className="space-y-4" onSubmit={handleSubmit(registerSubmit)}>
            {errors?.name && (
              <p className="p-2 text-red-600 text-sm">
                {errors?.name?.message}
              </p>
            )}
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border p-2"
              {...register("name")}
            />
            {errors?.email && (
              <p className="p-2 text-red-600 text-sm">
                {errors?.email?.message}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border p-2"
              {...register("email")}
            />
            {errors?.password && (
              <p className="p-2 text-red-600 text-sm">
                {errors?.password?.message}
              </p>
            )}
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border p-2"
              {...register("password")}
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">OR</div>

          {/* Social logins */}
          <button
            //   onClick={() => signIn("github", { callbackUrl: "/" })}
            className="mb-2 w-full rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-900"
          >
            Continue with GitHub
          </button>
          <button
            //   onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;
