'use client';

import React from 'react';
import {useProduct} from "@salesforce/commerce-sdk-react";
import {Box, Button, Flex, Spinner, Text} from "@chakra-ui/react";
import ImageGallerySkeleton from "@/components/product-view/ImageGallerySkeleton";
import ImageGallery from "@/components/product-view/ImageGallery";
import ProductViewHeader from "@/components/product-view/product-view.header";
import {getDisplayPrice} from "@/utils/product-utils";
import SwatchGroup from "@/components/swatch-group";
import {useDerivedProduct} from "@/hooks/use-derived-product";
import ProductQuantityStepper from "@/components/product-view/product-view.quantity-stepper";

export default function ProductDetail({params}: { params: { productId: string } }) {
    const {productId} = params;
    const isProductPartOfSet = false;
    const {data: product, isLoading} = useProduct({
        parameters: {
            id: productId,
            allImages: true
        }
    })
    const {
        variationAttributes,
        variationParams,
        quantity,
        setQuantity,
        stepQuantity,
        minOrderQuantity,
        showInventoryMessage,
        inventoryMessage,
        stockLevel
    } = useDerivedProduct(product, isProductPartOfSet)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { basePrice, discountPrice } = getDisplayPrice(product)
    const isOutOfStock = stockLevel === 0

    return (
        <Flex bg="blackAlpha.50" direction={{base: 'column', lg: 'row'}} gap={8} p={8} justify="center" h="full">
            <Box h="auto" w="30rem">
                {product ? (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <ImageGallery imageGroups={product.imageGroups || []} selectedVariationAttributes={variationParams} />
                ) : (
                    <ImageGallerySkeleton/>
                )}
            </Box>

            <Flex direction="column" gap={8} maxWidth="20rem">
                <ProductViewHeader
                    basePrice={basePrice}
                    discountPrice={discountPrice}
                    name={product?.name}
                    product={product}
                    productCurrency={product?.currency}
                />

                {variationAttributes
                    ? (variationAttributes as unknown as Array<CommerceSDK.VariationAttribute>).map(
                        (variationAttribute: CommerceSDK.VariationAttribute) => {
                            const { id, name, selectedValue, values = [] } = variationAttribute

                            return (
                                <SwatchGroup
                                    key={id}
                                    name={name}
                                    selectedValue={selectedValue as CommerceSDK.VariationAttributeValue}
                                    values={values}
                                />
                            )
                        }
                    )
                    : null}

                <ProductQuantityStepper {...{ quantity, setQuantity, stepQuantity, minOrderQuantity, stockLevel }} />

                {showInventoryMessage ? (
                    <Text color="orange.600" fontWeight={600} marginBottom={8}>
                        {inventoryMessage}
                    </Text>
                ) : null}

                <Button isDisabled={isOutOfStock} isLoading={isLoading} spinner={<Spinner size="md" />}>
                    Add to Cart
                </Button>
            </Flex>
        </Flex>
    );
}
