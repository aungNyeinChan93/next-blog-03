import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { articletable } from "./article-schema";
import { categoryTable } from "./category-schema";
import { relations } from "drizzle-orm";


export const articleCategoryTable = pgTable('article_category', {
    article_id: uuid().notNull().references(() => articletable.id),
    category_id: uuid().notNull().references(() => categoryTable.id)
}, (table) => ({
    pk: primaryKey({ columns: [table.article_id, table.category_id] }),
}));


export const articleCategoryRelations = relations(articleCategoryTable, ({ one }) => ({
    article: one(articletable, {
        fields: [articleCategoryTable.article_id],
        references: [articletable.id],
    }),
    category: one(categoryTable, {
        fields: [articleCategoryTable.category_id],
        references: [categoryTable.id],
    }),
}));
