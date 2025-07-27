import {cn} from '@/lib/utils';

interface NavigationLinkProps {
    isActive: boolean;
    title: string;
    url: string;
}

export function NavigationLink({isActive, title, url}: NavigationLinkProps) {
    return (
        <a
            href={url}
            className={cn(
                'bold lg:p-2 text-lg md:text-base hover:text-foreground',
                isActive ? '' : 'text-muted-foreground',
            )}
        >
            {title}
        </a>
    );
}
