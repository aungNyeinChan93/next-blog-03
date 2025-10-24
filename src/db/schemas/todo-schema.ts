import { boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";


export const todosTable = pgTable('todos', {
    id: uuid().primaryKey().defaultRandom(),
    task: text().notNull(),
    isCompleted: boolean().default(false),
    user_id: text().notNull().references(() => user.id, { onDelete: 'cascade' }),

    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().$onUpdate(() => new Date()),

}, (table) => ({
    taskIndex: index('taskIndex').on(table.task)
}));

export const todosTableRelations = relations(todosTable, ({ many, one }) => ({
    user: one(user, {
        fields: [todosTable.user_id],
        references: [user.id]
    })
}))