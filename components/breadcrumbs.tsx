import React, {useEffect, useState} from 'react'
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink
} from '@chakra-ui/react'

import Link from 'next/link'
import {categoryUrlBuilder} from '@/utils/urls'
import {ChevronRight} from '@/components/icons'
import {getApiClients} from "@/utils/commerce-api";

type BreadcrumbProps = {
  product?: CommerceSDK.Product$0
}

async function fetchCategory(categoryId: string = ''): Promise<CommerceSDK.Category | null> {
  try {
    const {shopperProducts} = await getApiClients();

    return await shopperProducts.getCategory({
      parameters: {
        id: categoryId,
        levels: 1,
      }
    });
  } catch (error) {
    console.error('Failed to fetch category:', error);
    return null;
  }
}

const Breadcrumbs: React.FC<BreadcrumbProps> = (props) => {
  const { product } = props
  const [category, setCategory] = useState<CommerceSDK.Category | null>(null)

  useEffect(() => {
    if (!product || !product?.primaryCategoryId) {
      return;
    }

    const fetchData = async () => {
      const category = await fetchCategory(product.primaryCategoryId);

      setCategory(category)
    }

    fetchData();
  }, [product])

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
                  href={categoryUrlBuilder(category as CommerceSDK.Category)}
              >
                {category.name}
              </ChakraBreadcrumbLink>
            </ChakraBreadcrumbItem>
        ))}
      </ChakraBreadcrumb>
  )
}

export default Breadcrumbs
