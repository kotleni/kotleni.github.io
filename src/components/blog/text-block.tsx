import {ReactNode} from 'react';
import {cn} from '@/lib/utils';

export function TextBlock({
    children,
    topPadding = 0,
}: {
    children: ReactNode;
    topPadding?: number;
}) {
    return (
        <p className={cn('text-foreground/80', `pt-${topPadding}`)}>
            {children}
        </p>
    );
}
