export interface Badge {
    label: string;
    imageUrl: string;
    targetUrl: string | null;
}

// https://cyber.dabamos.de/88x31/
export const badges: Badge[] = [
    {label: 'HTML', imageUrl: '/badges/html.png', targetUrl: null},
    {
        label: 'CSS',
        imageUrl: '/badges/made-with-css.gif',
        targetUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
        label: 'JavaScript',
        imageUrl: '/badges/java_script.gif',
        targetUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
        label: 'SVG',
        imageUrl: '/badges/svg.svg',
        targetUrl: 'https://developer.mozilla.org/en-US/docs/Web/SVG',
    },
    {
        label: 'HereIsNoCookies',
        imageUrl: '/badges/nocookie.gif',
        targetUrl:
            'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies',
    },
    {
        label: 'LinuxPowered',
        imageUrl: '/badges/linux-powered.gif',
        targetUrl: 'https://archlinux.org/',
    },
    {
        label: 'HateMicrosoft',
        imageUrl: '/badges/hatems.gif',
        targetUrl: 'https://archlinux.org/',
    },
    {
        label: 'ThisWebsiteIsSucks',
        imageUrl: '/badges/sucks.gif',
        targetUrl: '#',
    },
    {
        label: 'ThisWebsiteIsGay',
        imageUrl: '/badges/this-website-is-gay.gif',
        targetUrl: '#',
    },
];
