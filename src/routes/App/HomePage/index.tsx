const MainHeader: React.FC = () => {
    return (
        <section>
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
                            this site, you can read some of my <a href="/articles">articles</a>, or learn more
                            <a href="/me"> about me 💾</a>.
                            {/*<img*/}
                            {/*    src="/static/abc1.png"*/}
                            {/*    className="logo" alt="Big logo"/>*/}
                        </p>
                    </div>
                    {/*<img src="/ram.png" className="hero-image" alt="RAM Ram"/>*/}
                </div>
            </header>
        </section>
    );
};

// const ArticlesSection: React.FC = () => {
//     return (
//         <section className="section-index">
//             <header className="heading">
//                 <div><h2>Articles</h2>
//                     <div className="description">Guides, references, and personal notes.</div>
//                 </div>
//             </header>
//             <div className="posts newspaper">
//                 <a className="post" href="/testing-articles/"><p>Testing articles page</p>
//                     <time className="new-post">January 2025</time>
//                 </a>
//             </div>
//         </section>
//     );
// };

const HomePage: React.FC = () => {
    return (
        <>
            <MainHeader/>
            {/*<ArticlesSection/>*/}
            {/*<ProjectsSection/>*/}
        </>
    );
};

export {HomePage};