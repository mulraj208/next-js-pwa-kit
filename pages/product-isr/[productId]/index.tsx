import React from 'react';
import ProductView from "@/app/product/[productId]/product-view";
import {getApiClients} from "@/utils/commerce-api";
import Footer from "@/components/footer";
import HeaderView from "@/components/header/header-view";
import QueryProvider from "@/app/providers/QueryProvider";
import {levelZeroCategoriesQuery} from "@/components/header/header";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "@/constants";

async function fetchProductIds() {
    try {
        const {shopperSearch} = await getApiClients();
        const productSearch = await shopperSearch.productSearch({
            parameters: {
                limit: 10,
                offset: 0,
                q: 'women'
            }
        });

        return productSearch.hits.filter(product => !product.productType?.bundle).map(product => product.productId);
    } catch (error) {
        console.error('Failed to fetch product ids:', error);
    }
}

async function fetchProductData(productId: string) {
    try {
        const {shopperProducts} = await getApiClients();

        return await shopperProducts.getProduct({
            parameters: {
                id: productId,
                allImages: true
            }
        });
    } catch (error) {
        console.error('Failed to fetch product data:', error);
    }
}

export default function ProductDetail(props: { productData: CommerceSDK.Product$0; levelZeroCategoriesQuery: levelZeroCategoriesQuery }) {
    const {productData, levelZeroCategoriesQuery} = props;

    if (!productData) {
        return <h2>No Product Data found</h2>
    }

    console.log(productData);

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <QueryProvider locals={{}}>
                    <HeaderView levelZeroCategoriesQuery={levelZeroCategoriesQuery} />
                    <ProductView productData={productData} />
                    <Footer/>
                </QueryProvider>
            </body>
        </html>
    );
}

// This function gets called at build time
export async function getStaticPaths() {
    const productIds = await fetchProductIds() || [];

    // Get the paths we want to pre-render based on productId
    const paths = productIds.map((productId) => ({
        params: {productId}
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: true};
}

// This also gets called at build time
export async function getStaticProps({params}: { params: { productId: string } }) {
    // If the route is like /product-isr/25772792M, then params.productId is `25772792M`
    const productData = await fetchProductData(params.productId);
    const {shopperProducts} = await getApiClients();
    const levelZeroCategoriesQuery = await shopperProducts.getCategory({
        parameters: {id: CAT_MENU_DEFAULT_ROOT_CATEGORY, levels: CAT_MENU_DEFAULT_NAV_SSR_DEPTH}
    });

    // Pass product data to the page via props
    return {
        props: {
            productData,
            levelZeroCategoriesQuery,
            revalidate: 60, // This will force the page to revalidate after 60 seconds
        }
    };
}
