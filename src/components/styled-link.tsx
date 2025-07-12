import Link from 'next/link';
import {ReactNode} from 'react';

interface StyledLinkProps {
    children: ReactNode;
    href: string;
    target?: string;
    rel?: string;
}

export function StyledLink(props: StyledLinkProps) {
    return (
        <Link
            href={props.href}
            target={props.target}
            rel={props.rel}
            className="font-medium hover:text-primary/80"
        >
            {props.children}
        </Link>
    );
}
