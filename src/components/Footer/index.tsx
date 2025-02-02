import {NavSocialLink} from "../NavbarMenu/index.js";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

type Props = { socialLinks: NavSocialLink[] };

const Footer: React.FC<Props> = (props) => {
    return (
        <footer className={styles.footer}>
            <section className={styles.section}>
                <nav className={styles.menu}>
                    {props.socialLinks.map((link) => (
                        <Link to={link.url} target="_blank" rel="noopener noreferrer" className={styles.link} key={link.url}>
                            {link.icon({})}
                            {link.title}
                        </Link>
                    ))}
                </nav>
                <div className={styles.madeby}>Made with ❤️ by Viktor Varenik</div>
            </section>
        </footer>
    );
};

export { Footer };