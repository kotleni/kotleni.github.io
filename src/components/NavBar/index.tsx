import {MdMenu} from "react-icons/md";
import {NAV_LINKS} from "../../config.ts";
import styles from "./NavBar.module.scss";

interface Props {
    onMenuClick: () => void;
}

const NavBar: React.FC<Props> = (props) => {
    return (
        <header className={styles.navbar}>
            <div className={styles.title}>
                <div className={styles.titleContent}>
                    <a aria-current="page" className={styles.titleLink} href="/">
                        <span>
                            {/*<img src="" className="sidebar-logo" alt="Viktor Varenik" title="💾"/>*/}
                        </span>
                        <span>Viktor Varenik</span>
                    </a>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <button className={`${styles.button} ${styles.menuButton}`} onClick={props.onMenuClick}>
                        <MdMenu/>
                    </button>
                    <section className={styles.section}>
                        <nav className={styles.menu}>
                            {NAV_LINKS.map((link) => (
                                <a key={link.url} href={link.url}
                                   className={location.pathname === link.url ? styles.activeLink : styles.inactiveLink}>{link.title}</a>
                            ))}
                        </nav>
                    </section>
                </div>
            </div>
        </header>
    );
};

export {NavBar};