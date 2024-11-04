import React from 'react'

import { PopoverBody, PopoverContent, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import styles from '../../category-menu.styles'
import {categoryUrlBuilder} from "@/utils/urls";
import LinksList, {LinkListVariant} from "@/components/links-list";

type CategoryMenuContentProps = {
  listVariant?: LinkListVariant
  maxColumns: number
  items: Array<CommerceSDK.Category>
  itemsKey: string
  onClose: () => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
  popoverBodyRef: React.RefObject<HTMLDivElement>
}

const CategoryMenuContent: React.FC<CategoryMenuContentProps> = props => {
  const { listVariant, items, itemsKey, maxColumns, onClose: handleClose, onBlur: handleBlur, popoverBodyRef } = props

  const categoriesData = items.map((item: CommerceSDK.Category) => {
    const { id, name } = item
    const items = item[itemsKey] as Array<CommerceSDK.Category>
    const heading = {
      href: categoryUrlBuilder(item),
      text: name,
      styles: styles.categoryHeading
    }
    const links = items
      ? items.map((item: CommerceSDK.Category) => {
          const { name } = item
          return {
            href: categoryUrlBuilder(item),
            text: name
          }
        })
      : []
    return {
      id,
      heading,
      links
    }
  })

  const gridConfig: SimpleGridProps = {
    gridTemplateColumns: `repeat(${items.length > maxColumns ? maxColumns : items.length}, minmax(0, 20%))`,
    rowGap: 8
  }

  return (
    <PopoverContent data-testid="popover-menu" {...styles.popoverContent}>
      <PopoverBody ref={popoverBodyRef} onBlur={handleBlur}>
        <SimpleGrid justifyContent="center" gap={32} {...gridConfig} role="menu">
          {categoriesData.map(item => {
            return (
              <LinksList
                colorScheme="red.900"
                heading={item.heading}
                key={item.id}
                links={item.links}
                spacing={3}
                variant={listVariant}
                onLinkClick={handleClose}
              />
            )
          })}
        </SimpleGrid>
      </PopoverBody>
    </PopoverContent>
  )
}

export default CategoryMenuContent
