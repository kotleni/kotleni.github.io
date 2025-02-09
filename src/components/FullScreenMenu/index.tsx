import styles from "./FullScreenMenu.module.scss";
import {NAV_LINKS, NavLink} from "../../config.ts";
import {Link} from "react-router-dom";

interface Props {
    isOpen: boolean;
    onMenuItemClick: (navLink: NavLink) => void;
}

const FullScreenMenu: React.FC<Props> = (props) => {
    // Prevent body scrolling when menu opened
    document.body.style.overflow = props.isOpen ? 'hidden' : 'scroll';

    if(!props.isOpen) return null;

    return (
        <div className={styles.container}>
            <nav className={styles.items}>
                {NAV_LINKS.map((link: NavLink) => (
                    <Link
                        key={link.url}
                        to={link.url}
                        onClick={() => props.onMenuItemClick(link)}
                        className={`${styles.item} ${location.pathname === link.url ? styles.activeLink : styles.inactiveLink}`}>
                        {link.title}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export {FullScreenMenu};