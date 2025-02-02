import { Link } from "react-router-dom";

const MainHeader: React.FC = () => {
    return (
        <section>
            <header className="hero hero-index"><h1>Hey, I'm Viktor!</h1>
                <div className="hero-wrapper">
                    <div>
                        <p className="hero-description">
                            I'm a software engineer, open-source enthusiast, and retro tech lover.
                            <strong> I started my career as an Android developer</strong>, spending
                            three years crafting mobile experiences <strong>before shifting my focus to web
                            development in 2024</strong>. I've been started writing on this blog for the past
                            decade, sharing insights on coding, open-source projects, and my passion for all
                            things retro. Also, by the way — <i>I use Arch</i>, btw.
                        </p>
                        <p className="hero-description">
                            Also i enjoy languages, learning new things, coding, and making cool stuff for Linux.
                            When I'm not playing retro games or tweaking my Linux setup, I'm contributing to
                            open-source projects or experimenting with new tech.
                        </p>
                        <p className="hero-description">On
                            this site, you can read some of my <Link to="/articles">articles</Link>,
                            check my open source <Link to="/projects">projects</Link> or learn more
                            <Link to="/me"> about me 💾</Link>.
                        </p>
                    </div>
                </div>
            </header>
        </section>
    );
};

const HomePage: React.FC = () => {
    return (
        <>
            <MainHeader/>
        </>
    );
};

export {HomePage};