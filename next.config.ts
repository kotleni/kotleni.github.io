import type {NextConfig} from 'next';
import child_process from 'child_process';
import * as pkg from './package.json';

const commitHash = child_process
    .execSync('git log --pretty=format:"%h" -n1')
    .toString()
    .trim();

const branch = child_process
    .execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true,
    },
    env: {
        APP_VERSION: `${pkg.version}-${commitHash}-${branch}`,
    },
};

export default nextConfig;
