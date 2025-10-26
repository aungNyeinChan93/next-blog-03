import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";
import { categoryTable } from "./category-schema";
import { articleCategoryTable } from "./article_category-schema";


export const articletable = pgTable('articles', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    body: text().notNull(),
    author_id: text().notNull().references(() => user.id, { onDelete: 'set null' }),

    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().notNull().$onUpdate(() => new Date()),
}, (table) => ({
    // titleIndex: index('titleIndex').on(table.title)
}));

export const articleRelations = relations(articletable, ({ many, one }) => ({
    author: one(user, {
        fields: [articletable.author_id],
        references: [user?.id]
    }),
    categories: many(articleCategoryTable)
}))