'use server'

import { db } from "@/db/drizzle"
import { todosTable } from "@/db/schema";
import { Todo } from "@/lib/zod-schemas/todo-schema";
import { eq } from "drizzle-orm";



export async function getALlTodos({ page = 1, limit = 10, user_id }: { page?: number, limit?: number, user_id?: string }) {
    const skip = Number(page - 1) * limit

    const todos = await db.query.todosTable.findMany({
        where: eq(todosTable.user_id, user_id as string),
        limit,
        offset: skip,
        orderBy: (table, { desc }) => desc(table?.created_at),
        with: { user: { columns: { emailVerified: false } } }
    })
    return todos;
};


export async function getTodoById(id: string) {
    const todo = await db.query.todosTable.findFirst({
        where: (table, fns) => fns.eq(table.id, id),
        with: { user: true }
    })
    return todo;
}


export async function createTodoAction(data: Todo, user_id: string) {
    const [result] = await db
        .insert(todosTable)
        .values({ ...data, user_id: user_id! })
        .returning({
            id: todosTable.id,
        });
    return result
}