import z from "zod";

export type Article = z.infer<typeof ArticleSchema>
export const ArticleSchema = z.object({
    title: z.string().min(1, 'title field is required'),
    body: z.string().min(1, 'body field is required'),
    categories: z.string()
})