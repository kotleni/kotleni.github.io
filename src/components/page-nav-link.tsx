import {NavigationLink} from '@/components/navigation-link';
import {useLocation} from 'react-router-dom';

interface NavigationLinkProps {
    title: string;
    url: string;
}

export function PageNavigationLink(props: NavigationLinkProps) {
    const {pathname} = useLocation();
    const isActive =
        props.url === '/'
            ? pathname === props.url
            : pathname.startsWith(props.url);

    return (
        <NavigationLink
            title={props.title}
            url={props.url}
            isActive={isActive}
        />
    );
}
