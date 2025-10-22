import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";


export type ServerSession = Awaited<ReturnType<typeof getServerSession>>
export const getServerSession = cache(async () => {
    const session = await auth.api.getSession({ headers: await headers() })
    return session;
});
