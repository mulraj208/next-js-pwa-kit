import React from 'react';
import {Flex, Skeleton, Stack} from "@chakra-ui/react";
import styles from "@/components/category-menu/category-menu.styles";

export default async function HeaderLoading() {
    return (
        <Flex {...styles.container}>
            <Stack {...styles.menu}>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        </Flex>
    );
}
