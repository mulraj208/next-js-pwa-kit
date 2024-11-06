import React from 'react';
import ProductView from "@/app/product/[productId]/product-view";
import {fetchProductData} from "@/utils/fetch-product-data";

export default async function ProductDetail({productId}: { productId: string }) {
    const productData = await fetchProductData(productId);

    return (
        <ProductView productData={productData} />
    );
}
