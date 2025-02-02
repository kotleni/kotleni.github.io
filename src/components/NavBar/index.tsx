import {MdMenu} from "react-icons/md";
import {NAV_LINKS} from "../../config.ts";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";

interface Props {
    onMenuClick: () => void;
}

const NavBar: React.FC<Props> = (props) => {
    return (
        <header className={styles.navbar}>
            <div className={styles.title}>
                <div className={styles.titleContent}>
                    <Link aria-current="page" className={styles.titleLink} href="/">
                        <span>
                            {/*<img src="" className="sidebar-logo" alt="Viktor Varenik" title="💾"/>*/}
                        </span>
                        <span>Viktor Varenik</span>
                    </Link>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <button className={`${styles.button} ${styles.menuButton}`} onClick={props.onMenuClick}>
                        <MdMenu/>
                    </button>
                    <section className={styles.section}>
                        <nav className={`${styles.menu} ${styles.navItems}`}>
                            {NAV_LINKS.map((link) => (
                                <Link key={link.url} href={link.url}
                                   className={location.pathname === link.url ? styles.activeLink : styles.inactiveLink}>{link.title}</Link>
                            ))}
                        </nav>
                    </section>
                </div>
            </div>
        </header>
    );
};

export {NavBar};