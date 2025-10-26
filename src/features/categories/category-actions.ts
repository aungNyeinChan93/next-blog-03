'use server'

import { db } from "@/db/drizzle"
import { categoryTable } from "@/db/schema"
import { Category } from "@/lib/zod-schemas/category-schema"
import { sql } from "drizzle-orm"


export type CategoriesWithArticles = Awaited<ReturnType<typeof getAllCategories>>
export async function getAllCategories(page: number = 1, limit: number = 10) {

    const offset = Number(page - 1) * limit
    const categories = await db.query.categoryTable.findMany({
        // with: { articles: true },
        orderBy: (table, fns) => fns.desc(table.created_at),
        offset,
        limit,
    })

    return categories
};


export async function createCategoryAction(data: Category) {
    const [result] = await db.insert(categoryTable).values(data).returning({
        id: categoryTable.id
    })
    return result?.id
};



export async function getTotalCategoryCount() {
    const totalCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(categoryTable)
    return totalCount[0]?.count || 0
}



export async function getCategoryById(categoryId: string) {
    const category = await db.query.categoryTable.findFirst({
        where: (table, fns) => fns.eq(table?.id, categoryId)
    })
    return category
}

