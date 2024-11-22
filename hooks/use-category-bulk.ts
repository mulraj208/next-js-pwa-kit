// Hooks
import {useQueries} from '@tanstack/react-query'

export const useCategoryBulk = (
    ids: Array<string> = [],
    queryOptions: {
        enabled?: boolean
    }
) => {
    const queries = ids.map(id => {
        return {
            queryKey: [{ id, levels: 2 }],
            queryFn: async () => {
                const res = await fetch(`/api/commerce-sdk-react/category?id=${id}&levels=2`);
                return res.json();
            },
            ...queryOptions,
            enabled: queryOptions.enabled !== false && Boolean(id)
        }
    })

    return useQueries({queries});
}
