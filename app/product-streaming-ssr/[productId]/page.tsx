import React, {Suspense} from 'react';
import ProductDetail from "@/app/product-streaming-ssr/[productId]/product-detail";
import ProductViewSkeleton from "@/app/product-streaming-ssr/[productId]/product-view-skeleton";

export default async function ProductDetailWrapper({params}: { params: { productId: string } }) {
    const {productId} = params;

    return (
        <Suspense fallback={<ProductViewSkeleton />}>
            <ProductDetail productId={productId} />
        </Suspense>
    );
}
