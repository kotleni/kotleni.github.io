'use client';

import {useEffect, useState} from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

interface DecimalAgeProps {
    birthDate: string;
}

export const DecimalAge = ({birthDate}: DecimalAgeProps) => {
    const [age, setAge] = useState<string | null>(null);

    useEffect(() => {
        const ONE_YEAR_IN_MS = 31556952000;

        const calculateAge = () => {
            const now = new Date().getTime();
            const birth = new Date(birthDate).getTime();
            const diff = now - birth;

            const exactAge = diff / ONE_YEAR_IN_MS;
            setAge(exactAge.toFixed(9));
        };

        calculateAge();

        const intervalId = setInterval(calculateAge, 50);

        return () => clearInterval(intervalId);
    }, [birthDate]);

    if (!age) return null;

    return (
        <Tooltip>
            <TooltipTrigger className="font-mono">{age}</TooltipTrigger>
            <TooltipContent>
                <p>Detailed age as decimal number.</p>
            </TooltipContent>
        </Tooltip>
    );
};
