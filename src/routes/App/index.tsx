import './App.scss';
import { MdArrowOutward } from "react-icons/md";
// import { MdLightMode } from "react-icons/md";

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

import CoolBackgroundCanvas from "../../components/DottedBackground";
import PizzaIcon from "../../assets/pizza.svg?react";

type BadgeInfo = { title: string, link: string, icon?:  JSX.Element };

const FULL_NAME = "Viktor Varenik";

function Badge(props: { badge: BadgeInfo }) {
    return <a href={props.badge.link} className="badge">{props.badge.title}</a>;
}

export default function App() {
    const workingAt: BadgeInfo = { title: "Nowhere", link: "#" };
    const creatorOf: BadgeInfo[] = [
        { title: "Ukraine Metro App", link: "https://github.com/UniconTeam/UkraineMetro-android" },
        { title: "iPhoneVR", link: "https://github.com/kotleni/iPhoneVR" },
        { title: "MeowTG", link: "https://github.com/kotleni/meowtg" },
    ];
    const inTeams: BadgeInfo[] = [
        { title: "Unicon Team", link: "https://github.com/UniconTeam" },
        { title: "TimeMates", link: "https://github.com/timemates" },
    ];
    const findMeOn: BadgeInfo[] = [
        { title: "GitHub", link: "https://github.com/kotleni", icon: <FaGithub /> },
        { title: "LinkedIn", link: "https://www.linkedin.com/in/kotleni/", icon: <FaLinkedin /> },
        { title: "Twitter", link: "https://x.com/kotleni_", icon: <FaTwitter /> },
        { title: "Telegram", link: "https://t.me/kotleni", icon: <FaTelegram /> },
    ];

    return (
        <>
            <div className="top-bar">
                <div className="logo">
                    <PizzaIcon />
                </div>
                <a className="bar-link" href="/">Home</a>
                <a className="bar-link" href="/">Contacts</a>
                <a className="bar-link" href="/">Source code <MdArrowOutward/></a>
                {/*<a className="bar-link" href="/"><MdLightMode/></a>*/}
            </div>

            <div className="showcases-container">
                <div className="showcase-1">
                    <p className="text-title">{FULL_NAME}</p>
                    <p className="text-description">Hey, I am {FULL_NAME}, a fanatical open sourceror.</p>

                    <p className="text-description">
                        <span className="text-overline">Working at&nbsp; <Badge badge={workingAt} /></span>
                        <br/>
                        Creator of&nbsp;
                        {creatorOf.map((creatorOfIt) => {
                            return <Badge badge={creatorOfIt}/>;
                        })}
                        <br/>
                        Core team of&nbsp;
                        {inTeams.map((it) => {
                            return <Badge badge={it}/>;
                        })}
                    </p>

                    <p className="text-description">Dreaming up ideas and making them come true is where my passion
                        lies. You can find my full projects list here. I also do some things with Linux and
                        embedded.</p>
                    <p className="text-description">I give help and write blog posts about open source, coding,
                        tutorials, etc.</p>
                    <p className="text-description">Outside of programming, I enjoy doing photography and engineering.
                        Right now I live in Ukraine, Kremenchuk. If you are around, feel free to reach me out, we could
                        have some coffee or work together.</p>

                    <p className="text-description">
                        Find me on<br/>
                        {findMeOn.map((contribution) => {
                            return <a href={contribution.link} className="badge">{contribution.icon} {contribution.title}</a>;
                        })}
                        <br/>
                        Or mail me at <span className="email">yavarenikya@gmail.com</span>
                    </p>

                    {/*<p className="text-description">If you enjoy my work and find them useful, consider sponsor me and*/}
                    {/*    the ecosystem to help Open Source sustainable. Thank you! </p>*/}
                </div>
            </div>

            <div className="background">
                <CoolBackgroundCanvas/>
            </div>
        </>
    );
}
