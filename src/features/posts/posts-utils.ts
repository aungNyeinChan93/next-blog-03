


import { db } from "@/db/drizzle";
import { postTable } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function totalPostsCount() {
    const totalResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(postTable);

    const total = totalResult[0]?.count ?? 0
    return total
}