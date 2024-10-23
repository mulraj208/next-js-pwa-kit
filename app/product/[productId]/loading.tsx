import React from 'react';
import ImageGallerySkeleton from "@/components/product-view/ImageGallerySkeleton";
import {Box, Flex} from "@chakra-ui/react";

export default async function ProductDetailLoading() {
    return (
        <Flex bg="blackAlpha.50" direction={{base: 'column', lg: 'row'}} gap={8} p={8} justify="center">
            <Box h="auto" w="30rem">
                <ImageGallerySkeleton/>
            </Box>
            <Flex direction="column" gap={8} maxWidth="20rem">

            </Flex>
        </Flex>
    );
}
