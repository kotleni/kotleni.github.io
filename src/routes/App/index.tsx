import './App.scss';
import {SOCIAL_LINKS} from "../../config.ts";
import {NavBar} from "../../components/NavBar";
import {SideBar} from "../../components/SideBar";
import {Footer} from "../../components/Footer";
import {FullScreenMenu} from "../../components/FullScreenMenu";
import {useState} from "react";

type Props = { children: React.ReactNode };

const App: React.FC<Props> = (props) => {
    const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

    const onMenuClick = () => {
        setIsFullScreenMenuOpen(!isFullScreenMenuOpen);
    };

    const onMenuItemClick = () => {
        setIsFullScreenMenuOpen(false);
    };

    return (
        <>
            <div className="layout">
                <FullScreenMenu isOpen={isFullScreenMenuOpen} onMenuItemClick={onMenuItemClick}/>

                <NavBar onMenuClick={onMenuClick} />
                <SideBar/>
                <div className="main-wrapper">
                    <div className="main-container">
                        <main className="main-content page">
                            {props.children}
                        </main>
                    </div>
                    <Footer socialLinks={SOCIAL_LINKS}/>
                </div>
            </div>
        </>
    );
}

export { App };