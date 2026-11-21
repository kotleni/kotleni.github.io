import {useEffect, useState} from 'react';

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

        const intervalId = setInterval(calculateAge, 1000);

        return () => clearInterval(intervalId);
    }, [birthDate]);

    if (!age) return null;

    return <span title="Detailed age as decimal number.">{age}</span>;
};
