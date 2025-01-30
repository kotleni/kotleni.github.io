import {FaGithub, FaTwitter, FaTelegram, FaCoffee} from "react-icons/fa";
import {CardItemProps} from "./components/ProjectsCards";
import {IconType} from "react-icons";

type NavLink = { title: string, url: string };
type NavSocialLink = { title: string, icon: IconType, url: string };

const NAV_LINKS: NavLink[] = [
    {title: "Articles", url: "/articles"},
    {title: "Projects", url: "/projects"},
    {title: "Demos", url: "/demos"},
    {title: "About me", url: "/me" },
];
const SOCIAL_LINKS: NavSocialLink[] = [
    { title: "Github", icon: FaGithub, url: "https://github.com/kotleni" },
    { title: "Twitter", icon: FaTwitter, url: "https://x.com/kotleni_" },
    { title: "Telegram", icon: FaTelegram, url: "https://t.me/kotleni" },
    { title: "Buy Me A Coffee", icon: FaCoffee, url: "https://ko-fi.com/kotleni" }
];
const IS_HIDE_SOCIAL_LINKS_FROM_NAV = true;

const PROJECTS_CARDS: CardItemProps[] = [
    {
        title: "vrchat-osc-motd",
        description: "Customizable MOTD (in chatbox) system with plugins support for VRChat. ",
        year: "2025",
        url: "https://github.com/kotleni/vrchat-osc-motd",
        buttons: [
            { title: "Github", url: "https://github.com/kotleni/vrchat-osc-motd", target: "_blank" },
        ]
    },
    {
        title: "iPhoneVR",
        description: "Native iOS ALVR client with full support for head position and rotation tracking using ARKit.",
        year: "2024",
        url: "https://github.com/kotleni/iPhoneVR",
        buttons: [
            { title: "Github", url: "https://github.com/kotleni/iPhoneVR", target: "_blank" },
        ]
    },
    {
        title: "VirtHID-macOS",
        description: "MacOS kext for creating virtual HID devices.",
        year: "2024",
        url: "https://github.com/kotleni/VirtHID-macOS",
        buttons: [
            { title: "Github", url: "https://github.com/kotleni/VirtHID-macOS", target: "_blank" },
        ]
    },
    {
        title: "SyncRezka-Firefox",
        description: "Firefox extension for syncronized watching HDRezka. Just a demo.",
        year: "2024",
        url: "https://github.com/kotleni/SyncRezka-Firefox",
        buttons: [
            { title: "Github", url: "https://github.com/kotleni/SyncRezka-Firefox", target: "_blank" },
        ]
    },
    {
        title: "MeowTG",
        description: "A typescript user-bot software for telegram with dynamic plugins system.",
        year: "2023",
        url: "https://github.com/kotleni/meowtg",
        buttons: [
            { title: "Github", url: "https://github.com/kotleni/meowtg", target: "_blank" },
        ]
    },
    {
        title: "GLEngine",
        description: "Experimental C++ 3d OpenGL game engine. Just a demo.",
        year: "2023",
        url: "https://github.com/kotleni/glengine",
        buttons: [
            { title: "Github", url: "https://github.com/kotleni/glengine", target: "_blank" },
        ]
    },
    {
        title: "UkraineMetro",
        description: "Open source application for viewing maps of all subways of Ukraine.",
        year: "2023",
        url: "https://github.com/UniconTeam/UkraineMetro-android",
        buttons: [
            { title: "Github", url: "https://github.com/UniconTeam/UkraineMetro-android", target: "_blank" },
            { title: "Google Play", url: "https://play.google.com/store/apps/details?id=unicon.metro.kharkiv", target: "_blank" },
        ]
    },
];

export {NAV_LINKS, SOCIAL_LINKS, PROJECTS_CARDS, IS_HIDE_SOCIAL_LINKS_FROM_NAV};