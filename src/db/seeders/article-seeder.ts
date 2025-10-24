import 'dotenv/config'
import { db } from "../drizzle"
import { articletable } from "../schema"


export async function articleSeeder() {
    await db.insert(articletable).values(Array.from({ length: 20 }).map((_a, idx) => (
        {
            title: `article title ${idx + 1}`,
            body: `article body - ${idx + 1}`,
            author_id: 'vxRpfRhgoREd8fKHtnVpPr9myjGTDfDY'
        }
    )))

};

articleSeeder();

