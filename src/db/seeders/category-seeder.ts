import 'dotenv/config'
import { db } from '../drizzle'
import { categoryTable } from '../schema'


export async function categorySeeder() {
    const result = await db.insert(categoryTable).values(Array.from({ length: 10 }).map((category, idx) => (
        { name: `Category - ${idx + 1}` }
    ))).returning({
        name: categoryTable.name
    })
    console.log(JSON.stringify(result));

};

categorySeeder();