import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
