import styles from "./FullScreenMenu.module.scss";
import {NavLink} from "../NavbarMenu";
import {NAV_LINKS} from "../../config.ts";

interface Props {
    isOpen: boolean;
}

const FullScreenMenu: React.FC<Props> = (props) => {
    return (
        <div className={styles.container} hidden={!props.isOpen}>
            <nav className={styles.items}>
                {NAV_LINKS.map((link: NavLink) => (
                    <a key={link.url} href={link.url} className={styles.item}>{link.title}</a>
                ))}
            </nav>
        </div>
    );
};

export {FullScreenMenu};