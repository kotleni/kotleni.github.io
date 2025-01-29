import {NavSocialLink} from "../NavbarMenu/index.js";

type Props = { socialLinks: NavSocialLink[] };

const Footer: React.FC<Props> = (props) => {
    return (
        <footer className="footer">
            <section className="footer-section">
                <nav className="footer-menu">
                    {props.socialLinks.map((link) => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link">
                            <div className="footer-link-icon">
                                {link.icon({})}
                            </div>
                            {link.title}
                        </a>
                    ))}
                </nav>
                <div className="footer-made-by">Made with ❤️ by Viktor Varenik</div>
            </section>
        </footer>
    );
};

export { Footer };