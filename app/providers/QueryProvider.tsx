'use client';

import {ReactNode, useState} from 'react'
import {CommerceApiProvider} from '@salesforce/commerce-sdk-react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {withReactQuery} from '@salesforce/pwa-kit-react-sdk/ssr/universal/components/with-react-query'
import config from '@/config/dw'
import {ChakraProvider} from "@chakra-ui/react";
import {themeDefault} from '@/theme'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const defaultConfig = {
    clientId: config.CLIENT_ID,
    organizationId: config.ORGANIZATION_ID,
    redirectURI: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/callback`,
    proxy: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/mobify/proxy/api`,
    siteId: config.SITE_ID,
    shortCode: config.SHORT_CODE,
    locale: "en-US",
    currency: "USD",
}

function QueryProvider({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <CommerceApiProvider {...defaultConfig}>
                <ChakraProvider theme={themeDefault}>{children}</ChakraProvider>
            </CommerceApiProvider>
        </QueryClientProvider>
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

export default withReactQuery(QueryProvider as unknown as React.ReactElement, options) as unknown as React.FC<{ children: ReactNode; locals: unknown }>
