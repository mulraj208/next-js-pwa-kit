'use client';

import React, {useContext} from 'react'

import {Box, Link as ChakraLink, Flex, HStack, Heading, IconButton} from '@chakra-ui/react'
import Link from 'next/link'

import CategoryMenu from "@/components/category-menu";
import {DISCLOSURES_IDS, HOME_HREF} from "@/constants";
import {DisclosureTrackerContext} from "@/contexts/disclosure.tracker.context";
import {useLazyLoadCategories} from "@/hooks/use-lazy-load-categories";
import {HideOnDesktop, HideOnMobile} from "@/components/responsive";
import {flatten} from "@/utils/utils";
import styles from './header.styles'
import {MenuIcon} from "@/components/icons";
import MobileNavigation from "@/components/mobile-navigation";
import {AccordionItemType} from "@/components/nested-accordion";
// import Search from "@/components/search";

const Header: React.FC = () => {
    // Categories
    const {data: categoriesTree} = useLazyLoadCategories()
    const categories = flatten(categoriesTree || {}, 'categories')

    const id = DISCLOSURES_IDS.MOBILE_NAVIGATION
    const {disclosureTrackerAPI} = useContext(DisclosureTrackerContext)
    const handleOpen = () => {
        disclosureTrackerAPI.openById(id)
    }
    const handleClose = () => {
        disclosureTrackerAPI.closeById(id)
    }

    return (
        <Box as="header" layerStyle="page-spacer-x" {...styles.container}>
            <Box {...styles.content}>
                <Flex
                    alignItems={{base: 'left', lg: 'center'}}
                    direction={{base: 'column', lg: 'row'}}
                    justifyContent="space-between"
                    w="full"
                >
                    <HStack>
                        {/* Mobile Menu Icon */}
                        <HideOnDesktop>
                            <IconButton
                                colorScheme="clear"
                                icon={<MenuIcon boxSize="2rem" color="carminepink.800" />}
                                mr="2"
                                aria-label="Menu"
                                onClick={handleOpen}
                            />
                        </HideOnDesktop>

                        {/* Logo */}
                        <ChakraLink as={Link} href={HOME_HREF} variant="noUnderline">
                            <Heading as="h2" color="carminepink.800" fontSize="2rem" size="md">
                                SYSTEMA
                            </Heading>
                        </ChakraLink>
                    </HStack>

                    {/* Category Menu/List */}
                    <Box flex={1}>
                        <HideOnMobile>
                            <CategoryMenu listVariant="vertical" maxColumns={4} root={categories?.['root'] as CommerceSDK.Category} />
                        </HideOnMobile>
                    </Box>

                    {/* Search Field */}
                    <Box ml="auto" width={{base: 'full', lg: 60}}>
                        {/*<Search />*/}
                    </Box>

                    {/* Login link placeholder
                        TODO: Replace with AccountIcon
                    */}
                    <HideOnMobile>
                        <ChakraLink as={Link} ml={4} overflow="none" position="relative" href="/login">
                            Login
                        </ChakraLink>
                    </HideOnMobile>
                </Flex>
            </Box>

            {/* Sidebar menu for mobile */}
            <HideOnDesktop>
                <MobileNavigation root={categories?.['root'] as AccordionItemType} onClose={handleClose} />
            </HideOnDesktop>
        </Box>
    )
}

export default Header
