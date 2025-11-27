import {cn} from '@/lib/utils';
import Link from 'next/link';
import {ComponentProps} from 'react';

type StyledLinkProps = ComponentProps<typeof Link>;

export function StyledLink(props: StyledLinkProps) {
    return (
        <Link
            {...props}
            className={cn(
                props.className,
                'text-primary hover:bg-primary hover:text-background',
            )}
        />
    );
}
