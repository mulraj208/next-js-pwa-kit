import React from 'react'

import { Center, Flex, Spinner, Stack } from '@chakra-ui/react'

import styles from './category-menu.styles'
import CategoryMenuPopover from './partials/components/category-menu.popover'
import {LinkListVariant} from "@/components/links-list";

const MAXIMUM_NUMBER_COLUMNS = 5

type CategoryMenuProps = {
  listVariant?: LinkListVariant
  root: CommerceSDK.Category
  maxColumns?: number
}

const CategoryMenu: React.FC<CategoryMenuProps> = props => {
  const { root, listVariant, maxColumns = MAXIMUM_NUMBER_COLUMNS } = props
  const itemsKey = 'categories'

  return (
    <nav aria-busy="false" aria-label="Main Navigation" id="list-menu">
      <Flex {...styles.container}>
        {root?.[itemsKey as keyof typeof root] ? (
          <Stack {...styles.menu}>
            {root[itemsKey]
              ? root[itemsKey].map?.((item: CommerceSDK.Category) => {
                  const { id, name } = item
                  return (
                    <CategoryMenuPopover
                      item={item}
                      items={item?.[itemsKey]}
                      itemsKey={itemsKey}
                      key={id}
                      listVariant={listVariant}
                      maxColumns={maxColumns}
                      name={name}
                    />
                  )
                })
              : null}
          </Stack>
        ) : (
          <Center p="2">
            <Spinner size="lg" />
          </Center>
        )}
      </Flex>
    </nav>
  )
}

export default CategoryMenu
