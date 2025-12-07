'use client';

import {cn} from '@/lib/utils';
import {SidebarClose} from 'lucide-react';

export function BackButton() {
    return (
        <SidebarClose
            className={cn(
                'cursor-pointer',
                'text-neutral-50 hover:text-neutral-400',
            )}
            onClick={() => {
                history.back();
            }}
        />
    );
}
