import type {NextConfig} from 'next';
import child_process from 'child_process';
import * as pkg from './package.json';

const commitHash = child_process
    .execSync('git log --pretty=format:"%h" -n1')
    .toString()
    .trim();

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        APP_VERSION: pkg.version,
        COMMIT_HASH: commitHash,
    },
};

export default nextConfig;
