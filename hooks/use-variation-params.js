import { usePDPSearchParams } from './use-pdp-search-params'

/*
 * This hook will return only the params that are also product attributes for the
 * passed in product object.
 */
export const useVariationParams = (product = {}, isProductPartOfSet = false) => {
    const {variationAttributes = [], variationValues = {}} = product

    const [allParams, productParams] = usePDPSearchParams(product.id)
    const params = isProductPartOfSet ? productParams : allParams

    // Using all the variation attribute id from the array generated below, get
    // the value if there is one from the location search params and add it to the
    // accumulator.
    const variationParams = variationAttributes
        .map(({id}) => id)
        .reduce((acc, key) => {
            let value = params.get(`${key}`) || variationValues?.[key]
            return value ? {...acc, [key]: value} : acc
        }, {})

    return variationParams
}
