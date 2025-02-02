import { Link } from "react-router-dom";

const SideBar: React.FC = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-title">
                    <Link className="sidebar-title-link" aria-current="page" to="/">
                                <span>
                                    {/*<img src="" className="sidebar-logo" alt="Viktor Varenik" title="💾"/>*/}
                                </span>
                        <span>Viktor Varenik</span>
                    </Link>
                </div>
                <div className="sidebar-container">
                    <section className="sidebar-section"><h2>About me</h2>
                        <div className="sidebar-content"><p>I'm <Link to="/me">Viktor</Link>, software engineer and
                            fanatical open sourceror. This is my digital garden.</p></div>
                    </section>
                    <section className="sidebar-section">
                        <h2>Good conversations is missing!</h2>
                        <p>If you are interested in communicating with me in English, write to me!</p>
                        <p>
                            <Link to="mailto:yavarenikya@gmail.com" target="_blank"
                               rel="noopener noreferrer">yavarenikya@gmail.com</Link>
                        </p>
                        <Link to="https://discord.com/users/420149869601357824" target="_blank" rel="noopener noreferrer"
                           className="button">Discord</Link>
                        &nbsp;
                        <Link to="https://t.me/kotleni" target="_blank" rel="noopener noreferrer"
                           className="button">Telegram</Link>
                    </section>
                    <section className="sidebar-section">
                        <h2>Some of my favorite posts</h2>
                        <nav className="sidebar-menu">
                            {/*<Link to="/me">Link to random thing</Link>*/}
                            <Link to="/articles">All topics</Link></nav>
                    </section>
                </div>
            </div>
        </aside>
    );
};

export {SideBar};