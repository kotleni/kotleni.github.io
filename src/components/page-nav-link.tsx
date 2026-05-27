import {NavigationLink} from '@/components/navigation-link';
import {useLocation} from 'react-router-dom';

interface NavigationLinkProps {
    title: string;
    url: string;
}

export function PageNavigationLink(props: NavigationLinkProps) {
    const currentPath = useLocation().pathname;

    return (
        <NavigationLink
            title={props.title}
            url={props.url}
            isActive={currentPath === props.url}
        />
    );
}
