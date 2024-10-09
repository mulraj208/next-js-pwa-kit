'use client';

import React from 'react';
import {useProduct} from "@salesforce/commerce-sdk-react";
import {Box, Flex} from "@chakra-ui/react";
import ImageGallerySkeleton from "@/components/product-view/ImageGallerySkeleton";
import ImageGallery from "@/components/product-view/ImageGallery";
import {useVariationParams} from '@/hooks/use-variation-params'

export default function ProductDetail({params}: { params: { productId: string } }) {
    const {productId} = params;
    const {data: product} = useProduct({
        parameters: {
            id: productId,
            allImages: true
        }
    })

    const variationParams = useVariationParams(product, false)

    console.log(productId, product)

    return (
        <Flex direction={{base: 'column', lg: 'row'}} gap={8} p={8} justifyContent="center">
            <Box h="auto" w="30rem">
                {product ? (
                    <ImageGallery
                        imageGroups={product.imageGroups || []}
                        selectedVariationAttributes={variationParams}
                    />
                ) : (
                    <ImageGallerySkeleton/>
                )}
            </Box>
        </Flex>
    );
}
