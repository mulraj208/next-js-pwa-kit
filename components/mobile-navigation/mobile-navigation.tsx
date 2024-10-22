'use client';

import React, { useEffect } from 'react'

import {
  Box,
  Center,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Fade,
  HStack,
  Heading,
  Spacer,
  Spinner,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link';

import SupportLinks from './partials/components/mobile-navigation.support-links'

import {DISCLOSURES_IDS} from "@/constants";
import {categoryUrlBuilder} from "@/utils/urls";
import Drawer from "@/components/drawer";
import {usePathname} from "next/navigation";
import NestedAccordionMenu, {AccordionItemType} from "@/components/nested-accordion";

// Props required by NestedAccordion component
// they define the fonts at each depth of the nested navigation items
const FONT_SIZES = ['lg', 'md', 'md']
const FONT_WEIGHTS = ['semibold', 'semibold', 'regular']

const DrawerSeparator = () => (
  <Box py={6}>
    <Divider />
  </Box>
)

type MobileNavigationProps = {
  placement?: 'left' | 'right'
  root: AccordionItemType
  onClose: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = props => {
  const { placement, root, onClose: handleClose } = props
  const pathname = usePathname();
  const itemsKey = 'categories'
  const id = DISCLOSURES_IDS.MOBILE_NAVIGATION

  // Close menu when a link is clicked (location changed)
  useEffect(() => {
    handleClose()
  }, [pathname])

  return (
    <Drawer
      isFullHeight
      colorScheme="mobile-navigation"
      disclosureId={id}
      placement={placement ? placement : 'left'}
      size="mobile-navigation"
      variant="mobile-navigation"
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerHeader as={HStack}>
          <Link href="/" onClick={handleClose}>
            <Heading as="h2" color="carminepink.800" fontSize="2rem" size="md">
              SYSTEMA
            </Heading>
          </Link>

          <Spacer />
        </DrawerHeader>

        <DrawerCloseButton />

        <DrawerBody>
          <Box aria-atomic="true" aria-busy="false" aria-live="polite">
            {/* Category Navigation */}
            {root?.[itemsKey] ? (
              <Fade in>
                <NestedAccordionMenu
                  allowMultiple
                  fontSizes={FONT_SIZES}
                  fontWeights={FONT_WEIGHTS}
                  item={root}
                  itemsKey={itemsKey}
                  marginBottom={5}
                  urlBuilder={(category: CommerceSDK.Category) => categoryUrlBuilder(category as CommerceSDK.Category)}
                />
              </Fade>
            ) : (
              <Center p="8">
                <Spinner size="xl" />
              </Center>
            )}
          </Box>

          <DrawerSeparator />

          {/* Application Actions */}
          <VStack>
            {/* TODO: Define menu for registered/logged-in customer as well as provide sign-in link if customer is not logged-in */}
          </VStack>

          <DrawerSeparator />
          <SupportLinks />
          <DrawerSeparator />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNavigation
