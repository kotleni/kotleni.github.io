import {useEffect, useState} from 'react';

export function getSystemReducedMotion(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

export function useReducedMotion() {
    const [reducedMotion, setReducedMotion] = useState<boolean>(
        getSystemReducedMotion,
    );

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onMotion = () => setReducedMotion(media.matches);

        media.addEventListener('change', onMotion);
        return () => media.removeEventListener('change', onMotion);
    }, []);

    return reducedMotion;
}
