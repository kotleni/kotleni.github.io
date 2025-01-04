import ParallaxBackground from './Components/ParallaxBackground';
import {Link} from "react-router";
import VersionTip from "./Components/VersionTip.tsx";

function AppHeader() {
    return (
        <header className="header">
            <Link className="header-title" to="/rick">Viktor Varenik</Link>
            <h2 className="header-subtitle">Android and iOS developer</h2>
        </header>
    );
}

function SocialItem(props: { link: string, title: string }) {
    return (
        <li className="social-item"><a className="social-link" href={props.link}>{props.title}</a></li>
    );
}

function AppBody() {
    return (
        <footer className="footer">
            <p className="footer-desc">I'm a developer based in Kharkiv, Ukraine. Specialized in developing react frontend and mobile applications using native technologies.</p>
            <ul className="social">
                <h3 className="social-title">Contacts:</h3>
                <SocialItem title="email" link="mailto:yavarenikya@gmail.com"/>
                <SocialItem title="telegram" link="https://t.me/kotleni"/>
                <SocialItem title="github" link="https://github.com/kotleni"/>
                <SocialItem title="linkedin" link="https://www.linkedin.com/in/kotleni"/>
            </ul>
        </footer>
    );
}

function App() {
    return (
        <div className="subroot">
            <div className="App">
                <AppHeader/>
                <AppBody/>
            </div>
            <ParallaxBackground/>
            <VersionTip/>
        </div>
    );
}

export default App;
