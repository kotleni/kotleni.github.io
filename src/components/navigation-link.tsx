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
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                'px-1.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] no-underline transition-colors',
                isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
        >
            {isActive ? `[${title}]` : title}
        </Link>
    );
}
