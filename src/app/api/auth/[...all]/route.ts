import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const authHandler = toNextJsHandler(auth);

export const { GET } = authHandler;



export async function POST(request: NextRequest) {
    const cloneRequest = request.clone();

    return authHandler.POST(cloneRequest)
}