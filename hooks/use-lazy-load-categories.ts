import {mergeMatchedItems} from "@/utils/utils";
import {useCategoryBulk} from "@/hooks/use-category-bulk";
import type { levelZeroCategoriesQuery } from "@/components/header/header";

const onClient = typeof window !== 'undefined'

export const useLazyLoadCategories = ({ levelZeroCategoriesQuery }: { levelZeroCategoriesQuery: levelZeroCategoriesQuery }) => {
    const itemsKey = 'categories'
    const ids = levelZeroCategoriesQuery?.[itemsKey]?.map((category: CommerceSDK.Category) => category.id)
    const queries = useCategoryBulk(ids, {
        enabled: onClient && ids && ids?.length > 0
    })
    const dataArray = queries.map(query => query.data).filter(Boolean)
    const isLoading = queries.some(query => query.isLoading)
    const isError = queries.some(query => query.isError)

    return {
        isLoading,
        isError,
        data: {
            ...levelZeroCategoriesQuery,
            [itemsKey]: mergeMatchedItems(levelZeroCategoriesQuery?.categories || [], dataArray)
        }
    }
}
