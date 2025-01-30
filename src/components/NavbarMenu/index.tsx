// import {IconType} from "react-icons";
// import {useLocation} from "react-router";
// import styles from "./NavBar.module.scss";
//
// type NavLink = { title: string, url: string };
// type NavSocialLink = { title: string, icon: IconType, url: string };
//
// type Props = { links: NavLink[], socialLinks: NavSocialLink[] };
//
// const NavbarMenu: React.FC<Props> = (props) => {
//     const location = useLocation();
//     console.log(location.pathname);
//
//     return (
//         <section className={styles.section}>
//             <nav className={styles.menu}>
//                 {props.links.map((link: NavLink) => (
//                     <a key={link.url} href={link.url} className={location.pathname === link.url ? styles.currentlink : undefined}>{link.title}</a>
//                 ))}
//             </nav>
//         </section>
//     );
// };
//
// export { NavbarMenu };
// export type { NavLink, NavSocialLink };
