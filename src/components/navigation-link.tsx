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
            className={isActive ? 'docs-nav-active' : undefined}
        >
            {title}
        </Link>
    );
}
