import './App.scss';
import { FaGithub } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";

export default function App() {
    return (
        <>
            <div className="layout">
                <header  className="navbar">
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
                            <section className="navbar-section">
                                <nav className="navbar-menu nav-items">
                                    <a href="/notes">Notes</a>
                                    <a href="/blog">Articles</a>
                                    <a href="/projects">Projects</a>
                                    <a href="/illustration">Illustration</a>
                                    <a href="/me">About me</a>
                                </nav>
                                <nav className="navbar-menu social">
                                    <button
                                       className="social-icon navbar-icon"
                                       aria-label="github">
                                        <span className="social-container">
                                            <MdLightMode/>
                                        </span>
                                    </button>
                                    <a href="https://github.com/kotleni"
                                       className="social-icon navbar-icon"
                                       target="_blank"
                                       aria-label="github">
                                        <span className="social-container">
                                            <FaGithub/>
                                        </span>
                                    </a>
                                </nav>
                            </section>
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
                                <div className="cards">
                                    <div className="card">
                                        <time>2022-actual</time>
                                        <a href="https://github.com/dsad/dsad" target="_blank"
                                           rel="noreferrer">iPhoneVR</a><p>Emulate VR headset using your Google Cardboard and your iPhone.</p>
                                        <div className="card-links">
                                            <a className="button small" href="/dsadadsadsad">Article</a>
                                            <a className="button small" href="https://dsa.com/dsadsa" target="_blank" rel="noreferrer">Github</a>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <time>2018-actual</time>
                                        <a href="https://github.com/dsadsadsa/dsadsadad" target="_blank"
                                           rel="noreferrer">Ukraine Metro</a><p>A free, open source universal Ukraine subways map.</p>
                                        <div className="card-links">
                                            <a className="button small" href="/building-dsada">Article</a>
                                            <a className="button small" href="https://dsa.dsa" target="_blank" rel="noreferrer">Github</a>
                                        </div>
                                    </div>
                                </div>
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
