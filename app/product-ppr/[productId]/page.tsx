import React from 'react';
import ProductView from "@/app/product/[productId]/product-view";
import {fetchProductData} from "@/utils/fetch-product-data";

export const experimental_ppr = true;

export default async function ProductDetail({params}: { params: { productId: string } }) {
    const {productId} = params;
    const productData = await fetchProductData(productId);

    return (
        <ProductView productData={productData} />
    );
}
