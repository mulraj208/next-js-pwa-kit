import React from 'react'
import {
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb"

import {categoryUrlBuilder} from '@/utils/urls'
import {ChevronRight} from 'lucide-react'
import {useQuery} from "@tanstack/react-query";
import {SkeletonText} from "@/components/ui/skeleton";

type BreadcrumbProps = {
  product?: CommerceSDK.Product$0
}

const Breadcrumbs: React.FC<BreadcrumbProps> = (props) => {
  const { product } = props
  const { data: categories, isLoading } = useQuery<{ data: CommerceSDK.Category | null }>(['category', product?.primaryCategoryId], async () => {
    const res = await fetch(`/api/commerce-sdk-react/category?id=${product?.primaryCategoryId}&levels=1`);
    return res.json();
  }, { enabled: !!product?.primaryCategoryId });

  if (isLoading) {
    return <SkeletonText mt="4" noOfLines={1} width="200px" />;
  }

  return (
      <BreadcrumbRoot fontSize="sm" minHeight={4} separator={<ChevronRight width={4} height={4} color="grey" display="flex" />}>
          {categories?.data?.parentCategoryTree?.map((category) => (
              <BreadcrumbLink key={category.id} href={categoryUrlBuilder(category as CommerceSDK.Category)} py={3} textDecoration="none">
                  {category.name}
              </BreadcrumbLink>
          ))}
      </BreadcrumbRoot>
  )
}

export default Breadcrumbs
