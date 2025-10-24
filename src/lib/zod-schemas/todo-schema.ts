import z from "zod";


export type Todo = z.infer<typeof TodoSchema>

export const TodoSchema = z.object({
    task: z.string().min(1, 'task filed is required'),
    isCompleted: z.boolean().nullable(),
})