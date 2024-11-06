'use client';

import {ReactNode, useState} from 'react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "@/components/ui/provider";

function QueryProvider({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Provider>{children}</Provider>
        </QueryClientProvider>
    )
}

export default QueryProvider;
