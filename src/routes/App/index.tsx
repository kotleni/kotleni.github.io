import {Link} from "react-router";
import VersionTip from "../../components/VersionTip";
import SocialItem from "../../components/SocialItem";
import ParallaxBackground from "../../components/ParallaxBackground";

import './App.scss';

export default function App() {
    return (
        <>
            <ParallaxBackground/>

            <header className="header">
                <Link className="header-title" to="/rick">Viktor Varenik</Link>
                <h2 className="header-subtitle">Fullstack Web & Mobile developer</h2>
            </header>

            <footer className="footer">
                <p className="footer-desc">I'm a developer based in Kharkiv, Ukraine. Specialized in developing fullstack and mobile applications using different technologies.</p>
                <ul className="social">
                    <h3 className="social-title">Contacts:</h3>
                    <SocialItem title="email" link="mailto:yavarenikya@gmail.com"/>
                    <SocialItem title="telegram" link="https://t.me/kotleni"/>
                    <SocialItem title="github" link="https://github.com/kotleni"/>
                    <SocialItem title="linkedin" link="https://www.linkedin.com/in/kotleni"/>
                </ul>
            </footer>

            <VersionTip/>
        </>
    );
}
