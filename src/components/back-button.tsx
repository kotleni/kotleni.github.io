import {cn} from '@/lib/utils';
import {SidebarClose} from 'lucide-react';

export function BackButton() {
    return (
        <SidebarClose
            className={cn(
                'cursor-pointer transition-colors',
                'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => {
                history.back();
            }}
        />
    );
}
