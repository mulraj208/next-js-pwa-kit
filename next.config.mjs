/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer'

const nextConfig = {
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/mobify/proxy/api/:path*',
                    destination: `https://kv7kzm78.api.commercecloud.salesforce.com/:path*`,
                },
                {
                    source: '/mobify/proxy/ocapi/:path*',
                    destination: `https://zzuz-008.dx.commercecloud.salesforce.com/:path*`,
                },
            ],
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'edge.disstg.commercecloud.salesforce.com',
            },
        ],
    },
};

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig);
