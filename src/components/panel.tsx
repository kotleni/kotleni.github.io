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
        <section className={cn('docs-section', className)}>
            <h2 className="docs-section-title">{title}</h2>
            <div className={cn('docs-section-body', bodyClassName)}>
                {children}
            </div>
        </section>
    );
}
