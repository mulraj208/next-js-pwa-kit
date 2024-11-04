import React from 'react'
import {Skeleton, Text} from '@chakra-ui/react'

type DisplayPriceProps = {
    basePrice?: string | number
    discountPrice?: number | null
    isProductASet?: boolean
    productCurrency?: string
}

const DisplayPrice: React.FC<DisplayPriceProps> = props => {
    const {basePrice, discountPrice, isProductASet = false} = props

    return (
        <Skeleton display="flex">
            {isProductASet ? (
                <Text fontSize="md" fontWeight="bold" mr={1}>
                    Starting at{' '}
                </Text>
            ) : null}

            {typeof discountPrice === 'number' ? (
                <Text fontWeight="bold">
                    discountPrice
                </Text>
            ) : null}

            <Text fontSize="lg" fontWeight={discountPrice ? 'normal' : 'bold'}
                  ml={typeof discountPrice === 'number' ? 2 : 0}>
                ${Number(basePrice).toFixed(2)}
            </Text>
        </Skeleton>
    )
}

export default DisplayPrice
