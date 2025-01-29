import {IconType} from "react-icons";
import {IS_HIDE_SOCIAL_LINKS_FROM_NAV} from "../../config.ts";

type NavLink = { title: string, url: string };
type NavSocialLink = { title: string, icon: IconType, url: string };
type Props = { links: NavLink[], socialLinks: NavSocialLink[] };

const NavbarMenu: React.FC<Props> = (props) => {
    return (
        <section className="navbar-section">
            <nav className="navbar-menu nav-items">
                {props.links.map((link: NavLink) => (
                    <a href={link.url}>{link.title}</a>
                ))}
            </nav>
            <nav className="navbar-menu social">
                {/*<button*/}
                {/*    className="social-icon navbar-icon"*/}
                {/*    aria-label="github">*/}
                {/*        <span className="social-container">*/}
                {/*            <MdLightMode/>*/}
                {/*        </span>*/}
                {/*</button>*/}
                <div hidden={IS_HIDE_SOCIAL_LINKS_FROM_NAV}>
                    {props.socialLinks.map((link: NavSocialLink) => (
                        <a href={link.url}
                           className="social-icon navbar-icon"
                           target="_blank"
                           aria-label={link.title}>
                    <span className="social-container">
                        {link.icon({})}
                    </span>
                        </a>
                    ))}
                </div>
            </nav>
        </section>
    );
};

export { NavbarMenu };
export type { NavLink, NavSocialLink };
