import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getKyivTimeZoneInfo() {
    const timeZone = 'Europe/Kyiv'; // IANA Time Zone ID
    const now = new Date();

    // 1. Get the formatted time with the long time zone name
    // Example output: "Eastern European Standard Time" or "Eastern European Summer Time"
    const typeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'long',
    });

    const formattedString = typeFormatter.format(now);

    // 2. Get the short offset (e.g., "GMT+2" or "GMT+3")
    const offsetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'shortOffset',
    });

    const offsetString = offsetFormatter
        ?.formatToParts(now)
        ?.find(part => part.type === 'timeZoneName')?.value;

    // 3. Determine Season based on keywords or offset
    // Kyiv Standard (Winter) = UTC+2
    // Kyiv Daylight (Summer) = UTC+3
    const isSummerTime =
        formattedString.includes('Summer') ||
        formattedString.includes('Daylight') ||
        offsetString === 'GMT+3';

    return {
        location: 'Kyiv, Ukraine',
        currentTime: now.toLocaleString('en-GB', {timeZone}), // en-GB uses 24h format
        timeZoneName: formattedString.split(', ').pop(), // Extract just the name
        utcOffset: offsetString,
        season: isSummerTime ? 'Summer Time (DST)' : 'Winter Time (Standard)',
    };
}
