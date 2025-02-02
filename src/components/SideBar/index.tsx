const SideBar: React.FC = () => {
    return (
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
                        <h2>Good conversations is missing!</h2>
                        <p>If you are interested in communicating with me in English, write to me!</p>
                        <p>
                            <a href="mailto:yavarenikya@gmail.com" target="_blank"
                               rel="noopener noreferrer">yavarenikya@gmail.com</a>
                        </p>
                        <a href="https://discord.com/users/420149869601357824" target="_blank" rel="noopener noreferrer"
                           className="button">Discord</a>
                        &nbsp;
                        <a href="https://t.me/kotleni" target="_blank" rel="noopener noreferrer"
                           className="button">Telegram</a>
                    </section>
                    <section className="sidebar-section">
                        <h2>Some of my favorite posts</h2>
                        <nav className="sidebar-menu">
                            {/*<a href="/me">Link to random thing</a>*/}
                            <a href="/articles">All topics</a></nav>
                    </section>
                </div>
            </div>
        </aside>
    );
};

export {SideBar};