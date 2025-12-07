'use client';

import {NavigationLink} from '@/components/navigation-link';
import {usePathname} from 'next/navigation';

interface NavigationLinkProps {
    title: string;
    url: string;
}

export function PageNavigationLink(props: NavigationLinkProps) {
    const currentPath = usePathname();

    return (
        <NavigationLink
            title={props.title}
            url={props.url}
            isActive={currentPath === props.url}
        />
    );
}
