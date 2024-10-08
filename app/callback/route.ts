import { NextResponse } from 'next/server';

export async function GET() {
    // Return an empty response
    return new NextResponse(null, { status: 204 }); // 204: No Content
}
