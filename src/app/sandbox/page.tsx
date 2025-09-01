'use client';

import {StyledLink} from '@/components/styled-link';
import {usePathname} from 'next/navigation';

interface SandboxApp {
    name: string;
    description: string;
    url: string;
}

const apps: SandboxApp[] = [
    {
        name: 'Physbox',
        description: "A 2d physical pixel's based sandbox",
        url: '/sandbox/physbox',
    },
];

export default function SandboxPage() {
    const pathName = usePathname();

    return (
        <div>
            {apps.map(app => {
                return (
                    <StyledLink
                        key={app.name}
                        title={app.name}
                        href={app.url + '?is_fullsized=1&ref=' + pathName}
                    />
                );
            })}
        </div>
    );
}
