import React, {useEffect, useState} from 'react'
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink
} from '@chakra-ui/react'

import Link from 'next/link'
import {ShopperProducts} from 'commerce-sdk-isomorphic';

import {categoryUrlBuilder} from '@/utils/urls'
import {ChevronRight} from '@/components/icons'
import {defaultConfig as config} from "@/app/providers/QueryProvider";
import Auth from "@salesforce/commerce-sdk-react/auth";
import {getAuthInstance} from "@/auth";
import {authConfig} from "@/auth/auth-config";

type BreadcrumbProps = {
  product?: CommerceSDK.Product$0
}

async function fetchCategory(auth: Auth, product: CommerceSDK.Product$0) {
  try {
    const { access_token } = await auth.ready();

    const shopperProducts = new ShopperProducts({
      parameters: {
        ...config
      },
      proxy: config.proxy
    });

    return await shopperProducts.getCategory({
      parameters: {
        id: product.primaryCategoryId || '',
        levels: 1,
      },
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  } catch (error) {
    console.error('Failed to fetch category:', error);
  }
}

const Breadcrumbs: React.FC<BreadcrumbProps> = (props) => {
  const { product } = props
  const [category, setCategory] = useState<CommerceSDK.Category | undefined>(undefined)

  useEffect(() => {
    if (!product || !product?.primaryCategoryId) {
      return;
    }

    const fetchData = async () => {
      const auth = getAuthInstance(authConfig)
      const category = await fetchCategory(auth, product);

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
