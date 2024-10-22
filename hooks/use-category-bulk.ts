// SDK
import {useAccessToken, useCommerceApi} from '@salesforce/commerce-sdk-react'
import * as queryKeyHelpers from '@salesforce/commerce-sdk-react/hooks/ShopperProducts/queryKeyHelpers'

// Hooks
import {useQueries} from '@tanstack/react-query'

import config from '@/config/dw';

export const useCategoryBulk = (
    ids: Array<string> = [],
    queryOptions: {
        enabled?: boolean
    }
) => {
    const api = useCommerceApi()
    const {getTokenWhenReady} = useAccessToken()

    const queries = ids.map(id => {
        return {
            queryKey: queryKeyHelpers.getCategory.queryKey({
                id,
                levels: 2,
                organizationId: config.ORGANIZATION_ID,
                siteId: config.SITE_ID
            }),
            queryFn: async () => {
                const token = await getTokenWhenReady()
                return await api.shopperProducts.getCategory({
                    parameters: {id, levels: 2},
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
            },
            ...queryOptions,
            enabled: queryOptions.enabled !== false && Boolean(id)
        }
    })

    return useQueries({queries});
}
