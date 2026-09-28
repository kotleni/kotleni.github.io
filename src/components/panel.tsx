import type {ReactNode} from 'react';
import {cn} from '@/lib/utils';

interface PanelProps {
    title: string;
    className?: string;
    bodyClassName?: string;
    children: ReactNode;
}

export function Panel({title, className, bodyClassName, children}: PanelProps) {
    return (
        <section className={cn('win', className)}>
            <h2 className="titlebar">
                {title}
                <span className="titlebar-buttons" aria-hidden="true">
                    <span className="titlebar-button" />
                    <span className="titlebar-button" />
                    <span className="titlebar-button" />
                </span>
            </h2>
            <div className={cn('p-4', bodyClassName)}>{children}</div>
        </section>
    );
}
