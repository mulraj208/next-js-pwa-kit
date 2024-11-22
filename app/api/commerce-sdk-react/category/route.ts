import { NextRequest, NextResponse } from 'next/server';
import {getApiClients} from "@/utils/commerce-api";

// revalidate after 24 hours
export const revalidate = 24 * 60 * 60 * 1000

export async function GET(request: NextRequest) {
    const {shopperProducts} = await getApiClients();
    // Retrieve the query string
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id')
    const levels = parseInt(searchParams.get('levels') || '1', 10)

    // If required parameters are missing, return an error response
    if (!id) {
        return NextResponse.json(
            { error: 'Missing query parameter: id is required.' },
            { status: 400 }
        );
    }

    const data = await shopperProducts.getCategory({
        parameters: {id, levels }
    })

    return NextResponse.json({ data, message: `Success! ${id}` })
}
