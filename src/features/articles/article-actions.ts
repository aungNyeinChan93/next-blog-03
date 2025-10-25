'use server'

import { db } from "@/db/drizzle"
import { articletable } from "@/db/schema"
import { Article } from "@/lib/zod-schemas/aarticle-schema"
import { count } from "console"
import { sql } from "drizzle-orm"



export async function getAllArticles({ page = 1, limit = 3 }: { page: number, limit?: number }) {
    const offset = Number(page - 1) * limit
    const articles = await db.query.articletable.findMany({
        orderBy: (table, fns) => fns.desc(table.created_at),
        offset,
        limit,
    })
    return articles
};


export async function getArticleTotalCount() {
    const totalCount = await db.select({ count: sql<number>`count(*)` }).from(articletable)
    return totalCount[0].count || 0
}


export async function createArticleAction(data: Article, author_id: string) {
    const [result] = await db.insert(articletable).values({ ...data, author_id })
        .returning({
            id: articletable.id
        })
    return result?.id || null
}