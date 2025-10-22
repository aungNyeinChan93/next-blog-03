import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";


export type Post = InferInsertModel<typeof postTable>
// export type SelectPost = InferSelectModel<typeof postTable>

export const postTable = pgTable('posts', {
    id: uuid().primaryKey().defaultRandom(),
    user_id: text().notNull().references(() => user.id, { onDelete: 'no action' }),
    title: text().notNull(),
    body: text(),

    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().$onUpdate(() => new Date()),

}, (table) => ({
    titleIndex: index('titleIndex').on(table.title)
}));


export const postTableRelations = relations(postTable, ({ one }) => ({
    user: one(user, {
        fields: [postTable.user_id],
        references: [user.id],
    }),
}));