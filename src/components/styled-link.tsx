import {cn} from '@/lib/utils';
import Link from 'next/link';

interface StyledLinkProps {
    title: string;
    href: string;
    alwaysUnderlined?: boolean;
    target?: string;
}

export function StyledLink(props: StyledLinkProps) {
    return (
        <Link
            href={props.href}
            target={props.target}
            className={cn(
                'text-primary',
                props.alwaysUnderlined ? 'underline' : 'hover:underline',
            )}
        >
            {props.title}
        </Link>
    );
}
