'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactNode} from 'react'
import {CommerceApiProvider} from '@salesforce/commerce-sdk-react'
// @ts-ignore
import {withReactQuery} from '@salesforce/pwa-kit-react-sdk/ssr/universal/components/with-react-query'
import config from '../../config/dw'

function QueryProvider({children}: { children: ReactNode }) {
    return (
        <CommerceApiProvider
            clientId={config.CLIENT_ID}
            organizationId={config.ORGANIZATION_ID}
            proxy="http://localhost:3000/mobify/proxy/api"
            redirectURI="http://localhost:3000/callback"
            siteId={config.SITE_ID}
            shortCode={config.SHORT_CODE}
            locale="en-US"
            currency="USD"
        >
            {children}
        </CommerceApiProvider>
    )
}


const isServerSide = typeof window === 'undefined'

// Recommended settings for PWA-Kit usages.
// NOTE: they will be applied on both server and client side.
const options = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 2 * 1000,
                ...(isServerSide ? {retryOnMount: false} : {}),
                // Option for debugging changes in cache with React Query Dev Tools
                refetchOnWindowFocus: false
            },
            mutations: {
                retry: false
            }
        }
    }
}

export default withReactQuery(QueryProvider, options)
