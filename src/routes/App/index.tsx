import './App.scss';
import {SOCIAL_LINKS} from "../../config.ts";
import {NavBar} from "../../components/NavBar";
import {SideBar} from "../../components/SideBar";
import {Footer} from "../../components/Footer";


type Props = { children: React.ReactNode };

const App: React.FC<Props> = (props) => {
    return (
        <>
            <div className="layout">
                <NavBar/>
                <SideBar/>
                <div className="main-wrapper">
                    <div className="main-container">
                        {props.children}
                    </div>
                    <Footer socialLinks={SOCIAL_LINKS}/>
                </div>
            </div>
        </>
    );
}

export { App };