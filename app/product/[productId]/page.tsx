'use client';

import React from 'react';
import {useProduct} from "@salesforce/commerce-sdk-react";

export default function ProductDetail({params}: { params: { productId: string } }) {
    const {productId} = params;
    const query = useProduct({
        parameters: {
            id: productId,
            allImages: true
        }
    })

    console.log(productId, query.data)

    return (
        <div className='space-y-8 lg:space-y-14'>
            Product Page
        </div>
    );
}
