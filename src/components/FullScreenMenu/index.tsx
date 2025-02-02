import styles from "./FullScreenMenu.module.scss";
import {NavLink} from "../NavbarMenu";
import {NAV_LINKS} from "../../config.ts";

interface Props {
    isOpen: boolean;
}

const FullScreenMenu: React.FC<Props> = (props) => {
    if(!props.isOpen) return null;

    return (
        <div className={styles.container}>
            <nav className={styles.items}>
                {NAV_LINKS.map((link: NavLink) => (
                    <Link
                        key={link.url}
                        href={link.url}
                        className={`${styles.item} ${location.pathname === link.url ? styles.activeLink : styles.inactiveLink}`}>
                        {link.title}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export {FullScreenMenu};