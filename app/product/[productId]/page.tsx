import React from 'react';
import ProductView from "@/app/product/[productId]/product-view";
import Auth from "@salesforce/commerce-sdk-react/auth";
import {getAuthInstance} from "@/auth";
import {authConfig} from "@/auth/auth-config";

async function fetchProductData(auth: Auth) {
    try {
        const { access_token } = await auth.ready();

        const response = await fetch('https://kv7kzm78.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_zzuz_008/products/TG250M?currency=USD&locale=en-US&allImages=true&siteId=RefArch', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch product data:', error);
    }
}

export default async function ProductDetail({params}: { params: { productId: string } }) {
    const {productId} = params;
    const auth = getAuthInstance(authConfig)
    const productData = await fetchProductData(auth);

    return (
        <ProductView productId={productId} productData={productData} />
    );
}
