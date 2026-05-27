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
            className={cn('nav-link', isActive ? 'nav-link-active' : '')}
        >
            {title}
        </Link>
    );
}
