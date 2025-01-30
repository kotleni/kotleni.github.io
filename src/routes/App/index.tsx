import './App.scss';
import {SOCIAL_LINKS} from "../../config.ts";
import {NavBar} from "../../components/NavBar";
import {SideBar} from "../../components/SideBar";
import {Footer} from "../../components/Footer";
import {FullScreenMenu} from "../../components/FullScreenMenu";


type Props = { children: React.ReactNode };

let isFullScreenMenuOpen: boolean = true;

const App: React.FC<Props> = (props) => {
    return (
        <>
            <div className="layout">
                <FullScreenMenu isOpen={isFullScreenMenuOpen} />

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