import {cn} from '@/lib/utils';
import {HTMLProps} from 'react';

type StyledLinkProps = HTMLProps<HTMLAnchorElement>;

export function StyledLink(props: StyledLinkProps) {
    return (
        <a
            {...props}
            className={cn(
                props.className,
                'text-primary transition-colors hover:underline',
            )}
        />
    );
}
