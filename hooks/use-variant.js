// Hooks
import {useVariationParams} from './use-variation-params'

/**
 * This hook returns the currently selected
 * variant or undefined. NOTE: All attributes must be selected before a variant
 * will be returned.
 *
 * @param {Object} product
 * @returns {Object} the currently selected `Variant` object.
 */
export const useVariant = (product = {}, isProductPartOfSet = false) => {
    const {variants = []} = product
    const variationParams = useVariationParams(product, isProductPartOfSet)

    // Get a filtered array of variants. The resulting array will only have variants
    // which have all the current variation params values set.
    const filteredVariants = variants.filter(({variationValues}) =>
        // A single liner that will return true if the current variation has all the
        // same attribute values as the passing in params.
        Object.keys(variationParams).every((key) => variationValues[key] === variationParams[key])
    )

    return filteredVariants.length === 1 ? filteredVariants[0] : undefined
}
