import 'dotenv/config'
import { db } from "../drizzle"
import { todosTable } from '../schema'




export async function todoSeeder() {
    await db.insert(todosTable).values(Array.from({ length: 10 }).map((_item, idx) => (
        { task: `Task ${idx + 1}`, user_id: 'db0ZCrVgEjhPyNicKq12kVyyD57DYg7c' }
    )))
};


todoSeeder();