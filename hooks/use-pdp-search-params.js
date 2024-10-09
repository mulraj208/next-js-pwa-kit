import { useSearchParams } from 'next/navigation'

export const usePDPSearchParams = (productId) => {
    const searchParams = useSearchParams()

    const allParams = new URLSearchParams(searchParams.toString())
    const productParams = new URLSearchParams(allParams.get(productId) || '')

    return [allParams, productParams]
}
