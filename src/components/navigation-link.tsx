import {cn} from '@/lib/utils';
import {Link} from 'react-router-dom';

interface NavigationLinkProps {
    isActive: boolean;
    title: string;
    url: string;
}

export function NavigationLink({isActive, title, url}: NavigationLinkProps) {
    return (
        <Link
            to={url}
            className={cn(
                'inline-flex min-h-8 items-center rounded-full px-3.5 text-[0.82rem] text-muted-foreground no-underline transition-all',
                isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted hover:text-foreground',
            )}
        >
            {title}
        </Link>
    );
}
