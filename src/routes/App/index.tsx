import './App.scss';
import { FaGithub } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import {NavbarMenu, NavLink, NavSocialLink} from "../../components/NavbarMenu";
import {CardItemProps, ProjectsCards} from "../../components/ProjectsCards";

export default function App() {
    const navLinks: NavLink[] = [
        {title: "Articles", url: "#"},
        {title: "Projects", url: "#"},
        {title: "Demos", url: "#"},
        {title: "About me", url: "#" },
    ];
    const socialLinks: NavSocialLink[] = [
        { title: "Github", icon: FaGithub, url: "https://github.com/kotleni" },
    ];
    const projectsCards: CardItemProps[] = [
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

    return (
        <>
            <div className="layout">
                <header className="navbar">
                    <div className="navbar-title">
                        <div className="navbar-title-content">
                            <a aria-current="page" className="navbar-title-link" href="/">
                                <span>
                                    {/*<img src="" className="sidebar-logo" alt="Viktor Varenik" title="💾"/>*/}
                                </span>
                                <span>Viktor Varenik</span>
                            </a>
                        </div>
                    </div>
                    <div className="navbar-wrapper">
                        <div className="navbar-container">
                            <button className="navbar-button nav-menu-button">
                                <MdMenu/>
                            </button>
                            <NavbarMenu links={navLinks} socialLinks={socialLinks} />
                        </div>
                    </div>
                </header>
                <aside className="sidebar">
                    <div className="sidebar-wrapper">
                        <div className="sidebar-title">
                            <a className="sidebar-title-link" aria-current="page" href="/">
                                <span>
                                    {/*<img src="" className="sidebar-logo" alt="Viktor Varenik" title="💾"/>*/}
                                </span>
                                <span>Viktor Varenik</span>
                            </a>
                        </div>
                        <div className="sidebar-container">
                            <section className="sidebar-section"><h2>About me</h2>
                                <div className="sidebar-content"><p>I'm <a href="/me">Viktor</a>, software engineer and
                                    fanatical open sourceror. This is my digital garden.</p></div>
                            </section>
                            <section className="sidebar-section">
                                <h2>Example of local ad</h2>
                                <p>TODO: Fill text here!</p>
                                <p>
                                    <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                                </p>
                                <a href="https://tdsadad" target="_blank" rel="noopener noreferrer" className="button">Follow</a>
                            </section>
                            <section className="sidebar-section">
                                <h2>Some of my favorite posts</h2>
                                <nav className="sidebar-menu">
                                    <a href="/me">Link to random thing</a>
                                    <a href="/topics">All topics</a></nav>
                            </section>
                        </div>
                    </div>
                </aside>
                <div className="main-wrapper">
                    <div className="main-container">
                        <main className="main-content page">
                            <header className="hero hero-index"><h1>Hey, I'm Viktor!</h1>
                                <div className="hero-wrapper">
                                    <div>
                                        <p className="hero-description">I'm a software engineer, fanatical open
                                            sourceror,
                                            and engineer. I've been making websites since 2024 and writing
                                            on this blog for the past decade.</p>
                                        <p className="hero-description">I enjoy
                                            languages, learning something new and useful, playing retro video games, and
                                            spending time with friends.</p>
                                        <p className="hero-description">On
                                            this site, you can check out all the <a href="/demos">web demos</a> I've
                                            coded, read some of my <a href="/notes">notes</a>, or learn more
                                            <a href="/me"> about me 💾</a>.
                                            {/*<img*/}
                                            {/*    src="/static/abc1.png"*/}
                                            {/*    className="logo" alt="Big logo"/>*/}
                                        </p></div>
                                    {/*<img src="/ram.png" className="hero-image" alt="RAM Ram"/>*/}
                                </div>
                            </header>
                            <section className="section-index">
                                <header className="heading">
                                    <div><h2>Articles</h2>
                                        <div className="description">Guides, references, and personal notes.</div>
                                    </div>
                                </header>
                                <div className="posts newspaper">
                                    <a className="post" href="/testing-articles/"><p>Testing articles page</p>
                                        <time className="new-post">January 2025</time>
                                    </a>
                                </div>
                            </section>
                            <section>
                                <header className="heading">
                                    <div><h2>Projects</h2>
                                        <div className="description">Open-source projects I've worked on over the
                                            years.
                                        </div>
                                    </div>
                                    <a className="button" href="/projects">All Projects</a></header>
                                <ProjectsCards cards={projectsCards}/>
                            </section>
                        </main>
                    </div>
                    <footer className="footer">
                        <section className="footer-section">
                            <nav className="footer-menu">
                                <a href="https://x.com/kotleni_" target="_blank" rel="noopener noreferrer"
                                   className="footer-link">Twitter</a>
                                <a href="https://ko-fi.com/kotleni" target="_blank" rel="noopener noreferrer"
                                   className="footer-link">Buy me a coffee</a>
                            </nav>
                            <div className="footer-made-by">Made with ❤️ by Viktor Varenik</div>
                        </section>
                    </footer>
                </div>
            </div>
        </>
    );
}
