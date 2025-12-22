export enum ProjectPlatform {
    web,
    android,
    ios,
    windows,
    linux,
    osx,
    osdev,
    embedded,
    backend,
    minecraftMod,
    browserExtension,
    miBand,
}

export interface Project {
    name: string;
    description: string;
    url: string;
    platforms: ProjectPlatform[];
}

const defineProject = (
    name: string,
    description: string,
    url: string,
    platforms: ProjectPlatform[],
): Project => {
    return {
        name,
        description,
        url,
        platforms,
    };
};

const projects2025: Project[] = [
    defineProject(
        'ukrainemetro-web',
        'A web app for viewing maps of all subways of Ukraine',
        'https://github.com/UniconTeam/UkraineMetro-web',
        [ProjectPlatform.web],
    ),
    defineProject(
        'friendly-web',
        'Web client for a Friendly backend',
        'https://github.com/friendly-social/web',
        [ProjectPlatform.web],
    ),
    defineProject(
        'corefsjs',
        'Virtual file system library for browsers',
        'https://github.com/kotleni/corefsjs',
        [ProjectPlatform.web],
    ),
    defineProject(
        'backend',
        'Awesome backend for some of my websites and apps',
        'https://github.com/kotleni/backend',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'IntangibleitemFrames',
        'Minecraft fabric mod to allow you click throgh item frames',
        'https://github.com/kotleni/intangibleitemframes-minecraft',
        [ProjectPlatform.minecraftMod],
    ),
    defineProject(
        'PickupHUD',
        'Displaying (in HUD) information about picked up items and experience',
        'https://github.com/kotleni/pickuphud-minecraft',
        [ProjectPlatform.minecraftMod],
    ),
    defineProject(
        'yt-volume-slider-extension',
        'Better and bigger custom youtube volume silder extension',
        'https://github.com/kotleni/yt-volume-slider-extension',
        [ProjectPlatform.browserExtension],
    ),
    defineProject(
        'mcbot-ts',
        'Experimental auto-playing minecraft bot',
        'https://github.com/kotleni/mcbot-ts',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'archiso-livecd',
        'Near to vanilla Arch Linux LiveCD with some changes',
        'https://github.com/kotleni/archiso-livecd',
        [ProjectPlatform.linux],
    ),
    defineProject(
        'source2tools',
        'Experimental Source 2 tools written in TypeScript',
        'https://github.com/kotleni/source2tools',
        [ProjectPlatform.linux, ProjectPlatform.osx, ProjectPlatform.windows],
    ),
    defineProject(
        'crafteria',
        'Yet another voxel game with unexpected crashes',
        'https://github.com/kotleni/Crafteria',
        [ProjectPlatform.linux, ProjectPlatform.osx],
    ),
    defineProject(
        'nextjs-actions-result',
        'Next.JS actions result API library',
        'https://github.com/kotleni/nextjs-actions-result',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'd*ckbot-tg',
        '(NSFW) Open-source funny telegram game bot for groups',
        'https://github.com/kotleni/dickbot-tg',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'md3-playground',
        'Android app for experimenting and debugging Material Design 3 in Jetpack Compose',
        'https://github.com/kotleni/MD3Playground-android',
        [ProjectPlatform.android],
    ),
    defineProject(
        'vrc-display-client',
        'Client for displaying low resolution images on user avatars via OSC',
        'https://github.com/kotleni/vrc-display-client',
        [ProjectPlatform.linux, ProjectPlatform.windows],
    ),
    defineProject(
        'glengine',
        'A demo OpenGL game engine that can do rendering',
        'https://github.com/kotleni/glengine',
        [ProjectPlatform.linux],
    ),
];

const projects2024: Project[] = [
    defineProject(
        'vrchat-osc-motd',
        'Customizable MOTD (in chatbox) system with plugins support for VRChat',
        'https://github.com/kotleni/vrchat-osc-motd',
        [ProjectPlatform.linux, ProjectPlatform.windows],
    ),
    defineProject(
        'rezkaprime',
        'A browser extension created for adding custom features like downloading video files and subtitles from HDrezka and its mirrors',
        'https://github.com/kotleni/rezkaprime-extension',
        [ProjectPlatform.browserExtension],
    ),
    defineProject(
        'aniyou',
        'Experimental web app to watch anime',
        'https://github.com/kotleni/aniyou',
        [ProjectPlatform.web],
    ),
    defineProject(
        'sndchprev-linux',
        'Sound channels direction preview for games on Linux (X11 + PipeWire)',
        'https://github.com/kotleni/sndchprev-linux',
        [ProjectPlatform.linux],
    ),
    defineProject(
        'virthid-macos',
        'macOS kext (driver) for creating virtual HID devices',
        'https://github.com/kotleni/VirtHID-macOS',
        [ProjectPlatform.osx],
    ),
    defineProject(
        'syncrezka-extension',
        'Browser extension for synchronized watching hdrezka',
        'https://github.com/kotleni/SyncRezka-Firefox',
        [ProjectPlatform.browserExtension],
    ),
    defineProject(
        'syncrezka-backend',
        'Backend for synchronized watching hdrezka',
        'https://github.com/kotleni/SyncRezka-Backend',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'iPhoneVR',
        'Deprecated but iOS ALVR client with full support of head position and rotation tracking using ARKit',
        'https://github.com/kotleni/iPhoneVR',
        [ProjectPlatform.ios],
    ),
];

const projects2023: Project[] = [
    defineProject(
        'credentials-storage-kt',
        'Multiplatform Kotlin library for storing key-value credentials',
        'https://github.com/timemates/credentials-storage-kt',
        [
            ProjectPlatform.android,
            ProjectPlatform.ios,
            ProjectPlatform.backend,
            ProjectPlatform.linux,
            ProjectPlatform.web,
            ProjectPlatform.windows,
            ProjectPlatform.osx,
        ],
    ),
    defineProject(
        'DiscordApp-iOS',
        'An experimental Discord client written in Swift for iOS',
        'https://github.com/kotleni/DiscordApp-iOS',
        [ProjectPlatform.ios],
    ),
    defineProject(
        'MoneyTracker',
        'Just an iOS application for tracking your money. Support EN and RU languages',
        'https://github.com/kotleni/MoneyTracker-ios',
        [ProjectPlatform.ios],
    ),
    defineProject(
        'WhiteNoise',
        'An iOS app featuring calm sounds for sleeping and relaxing, including nature sounds, regular noises, and more',
        'https://github.com/kotleni/WhiteNoise2-ios',
        [ProjectPlatform.ios],
    ),
    defineProject(
        'TikTok-SW',
        'Smart wrapper around TikTok website with autoscroll and videos counter',
        'https://github.com/kotleni/TikTok-SW',
        [ProjectPlatform.android],
    ),
    defineProject(
        'meowtg',
        'A typescript user-bot software for telegram with dynamic plugins system',
        'https://github.com/kotleni/meowtg',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'brfkc',
        'Just a brainf*ck transpiler to C',
        'https://github.com/kotleni/brfkc',
        [ProjectPlatform.linux, ProjectPlatform.osx],
    ),
    defineProject(
        'web-mic-linux',
        'Use any device with browser as a microphone for your linux',
        'https://github.com/kotleni-archive/web-mic-linux',
        [ProjectPlatform.linux],
    ),
];

const projects2022: Project[] = [
    defineProject(
        'cs2-eventsgrabber',
        'Kotlin library for grabbing cs2 events from console logs',
        'https://github.com/kotleni-archive/cs2-eventsgrabber',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'FinderPlus',
        'A OSX Finder extension that allows you create files and opening terminal in folders from context menu',
        'https://github.com/kotleni/FinderPlus-macOS',
        [ProjectPlatform.osx],
    ),
    defineProject(
        'csgo-run',
        'Custom launcher replacement for CSGO that can inject libraries',
        'https://github.com/kotleni/csgo-run',
        [ProjectPlatform.linux, ProjectPlatform.osx],
    ),
    defineProject(
        'genshin-lyre-player',
        'Lyre player for Genshin Impact that can play midi files via lyre instrument',
        'https://github.com/kotleni/genshin-lyre-player',
        [ProjectPlatform.linux, ProjectPlatform.windows, ProjectPlatform.osx],
    ),
    defineProject(
        'SimpleBand4-WatchFace',
        'Simple and optimized watchface for Mi Band 4',
        'https://github.com/kotleni/SimpleBand4-WatchFace',
        [ProjectPlatform.miBand],
    ),
];

const projects2021: Project[] = [
    defineProject(
        'telegram-globalchatbot',
        'Telegram bot that provide global anonymous chats',
        'https://github.com/kotleni-archive/telegram-globalchatbot',
        [ProjectPlatform.backend],
    ),
    defineProject(
        'smbclone',
        'Demo SMB clone with JFrame rendering',
        'https://github.com/kotleni-archive/SMBClone-OLD',
        [ProjectPlatform.linux, ProjectPlatform.osx, ProjectPlatform.windows],
    ),
];

const projects2020: Project[] = [
    defineProject(
        'helloos',
        'A experimental hobby x86 OS with custom malloc',
        'https://github.com/kotleni/HelloOS',
        [ProjectPlatform.osdev],
    ),
];

const projects2019: Project[] = [
    defineProject(
        'UkraineMetro',
        'Open source application for viewing maps of all subways in Ukraine',
        'https://github.com/UniconTeam/UkraineMetro-android',
        [ProjectPlatform.android],
    ),
];

const projects2018: Project[] = [
    defineProject(
        'PocketVK',
        'Automation toolkit for VK with plugins support',
        'https://github.com/kotleni/PocketVK',
        [ProjectPlatform.backend],
    ),
];

export const allMyProjects = {
    '2018': projects2018,
    '2019': projects2019,
    '2020': projects2020,
    '2021': projects2021,
    '2022': projects2022,
    '2023': projects2023,
    '2024': projects2024,
    '2025': projects2025,
};
