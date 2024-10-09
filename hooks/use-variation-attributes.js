import {useMemo} from 'react'
import {useEffect, useState} from 'react'

// Other Hooks
import {useVariationParams} from './use-variation-params'

// Utils
import {updateSearchParams} from '@/utils/urls'
import {usePDPSearchParams} from './use-pdp-search-params'

/**
 * Return the first image in the `swatch` type image group for a given
 * variation value of a product.
 *
 * @param {Object} product
 * @param {Object} variationValue
 * @returns {Object} image
 */
const getVariantValueSwatch = (product, variationValue) => {
    const {imageGroups = []} = product

    const imageGroup = imageGroups
        .filter(({viewType}) => viewType === 'swatch')
        .find(({variationAttributes = []}) => {
            const colorAttribute = variationAttributes.find(({id}) => id === 'color')
            const colorValues = colorAttribute?.values || []

            return colorValues.some(({value}) => value === variationValue.value)
        })

    return imageGroup?.images?.[0]
}

/**
 * Build a product href
 *
 * @param {Object} product
 * @param {Object} params
 * @param {Object} router
 * @returns {String} a product url for the current variation value.
 */
const buildVariantValueHref = ({
                                   pathname,
                                   existingParams,
                                   newParams,
                                   productId,
                                   isProductPartOfSet
                               }) => {
    const [allParams, productParams] = existingParams

    if (isProductPartOfSet) {
        updateSearchParams(productParams, newParams)
        allParams.set(productId, productParams.toString())
    } else {
        updateSearchParams(allParams, newParams)
    }

    return `${pathname}?${allParams.toString()}`
}

/**
 * Determine if a product's variant attribute value is orderable without having to
 * load the variant in question, but filtering the list of variants with the
 * passed in attribute values.
 *
 * @param {Object} product
 * @param {Object} variationParams
 * @returns
 */
const isVariantValueOrderable = (product, variationParams) => {
    return product.variants
        .filter(({variationValues}) =>
            Object.keys(variationParams).every(
                (key) => variationValues[key] === variationParams[key]
            )
        )
        .some(({orderable}) => orderable)
}

/**
 * Use a decorated version of a product's variation attributes. This version
 * will have the following additions: which variation attribute is selected,
 * each value will have a product URL, the swatch image if there is one, and
 * an updated orderable flag.
 *
 * @param {Object} product
 * @returns {Array} a decorated variation attributes list.
 *
 */
export const useVariationAttributes = (product = {}, isProductPartOfSet = false) => {
    const {variationAttributes = []} = product
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)  // Ensure this hook runs only on the client
    }, [])

    const variationParams = useVariationParams(product, isProductPartOfSet)
    const existingParams = usePDPSearchParams(product.id)

    return useMemo(
        () =>
            isClient
                ? variationAttributes.map((variationAttribute) => ({
                    ...variationAttribute,
                    selectedValue: {
                        name: variationAttribute.values.find(
                            ({value}) => value === variationParams?.[variationAttribute.id]
                        )?.name,
                        value: variationParams?.[variationAttribute.id]
                    },
                    values: variationAttribute.values.map((value) => {
                        const params = {
                            ...variationParams,
                            [variationAttribute.id]: value.value
                        }

                        return {
                            ...value,
                            image: getVariantValueSwatch(product, value),
                            href: buildVariantValueHref({
                                pathname: product.id,
                                existingParams,
                                newParams: params,
                                productId: product.id,
                                isProductPartOfSet
                            }),
                            orderable: isVariantValueOrderable(product, params)
                        }
                    })
                }))
                : [],
        [product]
    )
}
