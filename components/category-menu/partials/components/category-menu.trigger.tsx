import React from 'react'

import {Box, Link as ChakraLink, Text} from '@chakra-ui/react'
import Link from 'next/link';

import styles from '../../category-menu.styles'
import {categoryUrlBuilder} from "@/utils/urls";
import {PopoverTrigger} from "@/components/ui/popover";

type CategoryMenuTriggerProps = {
  item: CommerceSDK.Category
  name?: string
  isOpen?: boolean
  hasItems?: boolean
  onKeyDown?: (e: React.KeyboardEvent) => void
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void
}

const CategoryMenuTrigger: React.FC<CategoryMenuTriggerProps> = props => {
  const { item, name, hasItems, isOpen, onBlur: handleBlur } = props

  return (
      <PopoverTrigger asChild>
        <Box>
            <ChakraLink
                as={Link}
                role="menuitem"
                href={categoryUrlBuilder(item)}
                {...styles.menuItem}
                {...(hasItems ? styles.expandableMenuItem : {})}
                {...(isOpen ? styles.menuItemActive : {})}
                aria-describedby={hasItems ? 'menu-item-hint' : ''}
                onBlur={handleBlur}
            >
                {name}
            </ChakraLink>

            {hasItems ? (
                <Text as="span" id="menu-item-hint" {...styles.expandableMenuItemHint}>
                    Press Space to Expand
                </Text>
            ) : null}
        </Box>
      </PopoverTrigger>
  )
}

export default CategoryMenuTrigger
