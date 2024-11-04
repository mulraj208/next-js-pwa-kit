import React, {useEffect, useState} from 'react'
import {
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb"

import {categoryUrlBuilder} from '@/utils/urls'
import {ChevronRight} from 'lucide-react'
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
      <BreadcrumbRoot fontSize="sm" minHeight={4} separator={<ChevronRight width={4} height={4} color="grey" display="flex" />}>
          {category?.parentCategoryTree?.map((category) => (
              <BreadcrumbLink key={category.id} href={categoryUrlBuilder(category as CommerceSDK.Category)} py={3} textDecoration="none">
                  {category.name}
              </BreadcrumbLink>
          ))}
      </BreadcrumbRoot>
  )
}

export default Breadcrumbs
