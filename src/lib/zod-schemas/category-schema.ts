import z from "zod";



export type Category = z.infer<typeof CategorySchema>
export const CategorySchema = z.object({
    name: z.string().min(1, 'name field is required!'),
    description: z.string().nullable()
})