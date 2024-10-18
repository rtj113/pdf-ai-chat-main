/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
                port: "",
                pathname: "/VciRSTI.jpeg"
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "pdf-to-ai-chat.vercel.app",
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.firebaseio.com https://*.googleapis.com https://*.stripe.com;
                            worker-src 'self' blob:;
                            style-src 'self' 'unsafe-inline';
                            connect-src 'self' https://*.clerk.accounts.dev https://clerk.accounts.dev https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.stripe.com;
                            frame-src 'self' https://*.clerk.accounts.dev https://clerk.accounts.dev https://*.stripe.com;
                            img-src 'self' https://*.clerk.accounts.dev https://img.clerk.com data: https://*.googleapis.com https://*.stripe.com;
                            font-src 'self' data:;
                            object-src 'none';
                        `.replace(/\s{2,}/g, ' ').trim()
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'http://localhost:3000',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'POST, GET, OPTIONS',
                    }
                ],
            },
        ];
    },
};

export default nextConfig;
