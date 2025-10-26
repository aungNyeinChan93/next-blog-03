import z from "zod";

export type TestType = z.infer<typeof TestSchema>
export const TestSchema = z.object({
    name: z.string().min(1, 'name field is required!'),
    notification: z.object({
        sms: z.boolean(),
        email: z.boolean(),
        phone: z.boolean(),
    }),
    users: z.array(z.object({ email: z.email() })).min(1).max(5)
})