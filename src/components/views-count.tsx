'use client';

import {BackendService} from '@/services/backend-service';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {EyeIcon} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';

const backendService = new BackendService();

export function ViewsCount() {
    const url = usePathname();
    const [viewsCount, setViewsCount] = useState(-1);

    const fetchViewsCountAndReport = async () => {
        const count = await backendService.reportAndGetViewsForPage(url);
        setViewsCount(count);
    };

    useEffect(() => {
        void fetchViewsCountAndReport();
    }, []);

    return (
        <div className="flex flex-row items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <EyeIcon />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Anonymous views count.</p>
                    <p>(Can be cheated by other users)</p>
                </TooltipContent>
            </Tooltip>
            <p hidden={viewsCount < 0}>{viewsCount}</p>
            <Skeleton hidden={viewsCount >= 0} className="h-4 w-[25px]" />
        </div>
    );
}
