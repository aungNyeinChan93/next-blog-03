import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema'

const pg = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: pg, logger: true, schema });
