import { NextRequest, NextResponse } from 'next/server';
import {getApiClients} from "@/utils/commerce-api";

// revalidate after 24 hours
export const revalidate = 24 * 60 * 60 * 1000

export async function GET(request: NextRequest) {
    const {shopperProducts} = await getApiClients();
    // Retrieve the query string
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId')

    // If required parameters are missing, return an error response
    if (!productId) {
        return NextResponse.json(
            { error: 'Missing query parameter: productId is required.' },
            { status: 400 }
        );
    }

    const data = await shopperProducts.getProduct({
        parameters: {
            id: productId,
            allImages: true
        }
    });

    return NextResponse.json({ data, message: `Success! ${productId}` });
}
