import {MdMenu} from "react-icons/md";
import {NavbarMenu} from "../NavbarMenu";
import {NAV_LINKS, SOCIAL_LINKS} from "../../config.ts";

interface Props {
    onMenuClick: () => void;
}

const NavBar: React.FC<Props> = (props) => {
    return (
        <header className="navbar">
            <div className="navbar-title">
                <div className="navbar-title-content">
                    <a aria-current="page" className="navbar-title-link" href="/">
                                <span>
                                    {/*<img src="" className="sidebar-logo" alt="Viktor Varenik" title="💾"/>*/}
                                </span>
                        <span>Viktor Varenik</span>
                    </a>
                </div>
            </div>
            <div className="navbar-wrapper">
                <div className="navbar-container">
                    <button className="navbar-button nav-menu-button" onClick={props.onMenuClick}>
                        <MdMenu/>
                    </button>
                    <NavbarMenu links={NAV_LINKS} socialLinks={SOCIAL_LINKS}/>
                </div>
            </div>
        </header>
    );
};

export { NavBar };