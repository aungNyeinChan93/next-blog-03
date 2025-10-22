import { postTable } from './../schemas/post-schema';
import 'dotenv/config'
import { db } from '../drizzle'
import { posts } from './post-data';

export async function postSeeder() {
    try {
        const result = await db.insert(postTable).values(posts).returning({
            id: postTable.id
        })
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error instanceof Error ? error?.message : 'server error')
    }
};

postSeeder();