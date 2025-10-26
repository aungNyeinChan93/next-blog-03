import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { articletable } from "./article-schema";
import { articleCategoryTable } from "./article_category-schema";


export const categoryTable = pgTable('categories', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),

    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().notNull().$onUpdate(() => new Date()),

}, (table) => ({
    nameIndex: index('nameIndex').on(table.name)
}))


export const categoryRelations = relations(categoryTable, ({ many, one }) => ({
    articles: many(articleCategoryTable)
}))