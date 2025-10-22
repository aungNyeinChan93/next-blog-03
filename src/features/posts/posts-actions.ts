'use server'
import { db } from "@/db/drizzle"
import { postTable } from "@/db/schema"
import { sql } from "drizzle-orm"


export type Posts = Awaited<ReturnType<typeof getAllPosts>>

export async function getAllPosts({ limit = 2, q, page = 1 }: {
    limit?: number,
    q?: string,
    page?: number
}) {



    const skip = Number(page - 1) * limit

    const posts = await db.query.postTable.findMany({
        // where: () => whereCondition,
        columns: { updated_at: false },
        orderBy: (table, fns) => fns.desc(table.created_at),
        with: {
            user: {
                columns: { id: true, email: true }
            }
        },
        limit,
        offset: skip
    });
    return posts
};



export async function totalPostCount() {
    const totalResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(postTable);

    const total = totalResult[0]?.count ?? 0
    return total
}