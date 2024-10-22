import React from 'react'

import { Link as ChakraLink, PopoverAnchor, Text } from '@chakra-ui/react'
import Link from 'next/link';

import styles from '../../category-menu.styles'
import {categoryUrlBuilder} from "@/utils/urls";

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
  const nameProp = hasItems ? `${name ? name : ' '} __` : name

  return (
    <>
      <PopoverAnchor>
        <ChakraLink
          as={Link}
          name={nameProp}
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
      </PopoverAnchor>

      {hasItems ? (
        <Text as="span" id="menu-item-hint" {...styles.expandableMenuItemHint}>
          Press Space to Expand
        </Text>
      ) : null}
    </>
  )
}

export default CategoryMenuTrigger
