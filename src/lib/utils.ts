import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getKyivTimeZoneInfo() {
    const timeZone = 'Europe/Kyiv';
    const now = new Date();

    const typeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'long',
    });

    const formattedString = typeFormatter.format(now);

    const offsetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'shortOffset',
    });

    const offsetString = offsetFormatter
        ?.formatToParts(now)
        ?.find(part => part.type === 'timeZoneName')?.value;

    const isSummerTime =
        formattedString.includes('Summer') ||
        formattedString.includes('Daylight') ||
        offsetString === 'GMT+3';

    return {
        location: 'Kyiv, Ukraine',
        currentTime: now.toLocaleString('en-GB', {timeZone}),
        timeZoneName: formattedString.split(', ').pop(),
        utcOffset: offsetString,
        season: isSummerTime ? 'Summer Time (DST)' : 'Winter Time (Standard)',
    };
}
