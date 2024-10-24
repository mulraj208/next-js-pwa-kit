import React from 'react'

import { Heading, VStack } from '@chakra-ui/react'
import Breadcrumbs from "@/components/breadcrumbs";
import DisplayPrice from "@/components/product-view/display-price";

type ProductViewHeaderProps = {
  name?: string
  product: CommerceSDK.Product$0 | undefined
  productType?: CommerceSDK.ProductType
  basePrice?: string | number
  discountPrice?: number | null
  productCurrency?: string
}

const ProductViewHeader: React.FC<ProductViewHeaderProps> = props => {
  const { name, productType, product, basePrice, discountPrice, productCurrency } = props
  const isProductASet = productType?.set

  return (
    <VStack align="flex-start" mr={4} spacing={3}>
      <Breadcrumbs product={product} />
      <Heading fontSize="2xl">{`${name as string}`}</Heading>

      <DisplayPrice
        basePrice={basePrice}
        discountPrice={discountPrice}
        isProductASet={isProductASet}
        productCurrency={productCurrency}
      />
    </VStack>
  )
}

export default ProductViewHeader
