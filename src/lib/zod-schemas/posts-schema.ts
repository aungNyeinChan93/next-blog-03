import z from "zod";

export type Post = z.infer<typeof PostSchema>
export const PostSchema = z.object({
    title: z.string().min(1, 'Title Field is required'),
    body: z.string().min(1, 'body field is required')
})