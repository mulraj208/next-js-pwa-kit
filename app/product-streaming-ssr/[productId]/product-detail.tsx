import React from 'react';
import ProductView from "@/app/product/[productId]/product-view";
import Auth from "@salesforce/commerce-sdk-react/auth";
import {getAuthInstance} from "@/auth";
import {authConfig} from "@/auth/auth-config";
import {ShopperProducts} from "commerce-sdk-isomorphic";
import config from '@/config/dw'

export const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchProductData(auth: Auth, productId: string) {
    try {
        const {access_token} = await auth.ready();

        const shopperProducts = new ShopperProducts({
            parameters: {
                clientId: config.CLIENT_ID,
                organizationId: config.ORGANIZATION_ID,
                redirectURI: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/callback`,
                proxy: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/mobify/proxy/api`,
                siteId: config.SITE_ID,
                shortCode: config.SHORT_CODE,
                locale: "en-US",
                currency: "USD",
            },
            proxy: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/mobify/proxy/api`
        });

        return await shopperProducts.getProduct({
            parameters: {
                id: productId,
                allImages: true
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    } catch (error) {
        console.error('Failed to fetch product data:', error);
    }
}

export default async function ProductDetail({productId}: { productId: string }) {
    const auth = getAuthInstance(authConfig);
    const productData = await fetchProductData(auth, productId);

    return (
        <ProductView productData={productData} />
    );
}
