/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
