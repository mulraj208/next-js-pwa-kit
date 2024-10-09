import React from 'react'
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink
} from '@chakra-ui/react'

import { useCategory } from '@salesforce/commerce-sdk-react'
import Link from 'next/link'

import { categoryUrlBuilder } from '@/utils/urls'
import { ChevronRight } from '@/components/icons'

type BreadcrumbProps = {
  product?: CommerceSDK.Product$0
}

const Breadcrumbs: React.FC<BreadcrumbProps> = (props) => {
  const { product } = props

  // Note from SF: Since category needs id from product detail, it can't be server side rendered atm
  // until we can do dependent query on server
  const {
    data: category,
    isError: isCategoryError,
    error: categoryError,
  } = useCategory({
    parameters: {
      id: product?.primaryCategoryId || null,
      levels: 1,
    },
  })

  if (isCategoryError) {
    // @ts-ignore
    const errorStatus = (categoryError as CommerceSDK.CategoryError)?.response?.status
    switch (errorStatus) {
      case 404:
        throw new Error('Category Not Found.')
      default:
        throw new Error(`HTTP Error ${errorStatus} occurred.`)
    }
  }

  return (
      <ChakraBreadcrumb
          fontSize="sm"
          minHeight={4}
          separator={<ChevronRight boxSize={4} color="grey" display="flex" />}
      >
        {category?.parentCategoryTree?.map((category) => (
            <ChakraBreadcrumbItem key={category.id}>
              <ChakraBreadcrumbLink
                  as={Link}
                  py={3}
                  textDecoration="none"
                  href={categoryUrlBuilder(category as CommerceSDK.Category)} // Use `href` in Next.js
              >
                {category.name}
              </ChakraBreadcrumbLink>
            </ChakraBreadcrumbItem>
        ))}
      </ChakraBreadcrumb>
  )
}

export default Breadcrumbs
