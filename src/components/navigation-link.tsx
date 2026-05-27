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
                'inline-flex min-h-8 items-center rounded-sm px-2.5 text-sm text-muted-foreground no-underline hover:bg-muted hover:text-foreground',
                isActive ? 'bg-muted text-foreground' : '',
            )}
        >
            {title}
        </Link>
    );
}
