import Photo1 from "../../../assets/photo1.jpeg";
import {SOCIAL_LINKS} from "../../../config.ts";

const AboutPage: React.FC = () => {
    return (
        <>
            <header className="hero hero-page"><h1>About Me</h1></header>
            <p>
                I'm a software engineer, open-source enthusiast, and retro tech lover.
                <strong> I started my career as an Android developer</strong>, spending
                three years crafting mobile experiences <strong>before shifting my focus to web
                development in 2024</strong>. I've been started writing on this blog for the past
                decade, sharing insights on coding, open-source projects, and my passion for all
                things retro. Also, by the way — <i>I use Arch</i>, btw.
            </p>
            <p>
                Also i enjoy languages, learning new things, coding, and making cool stuff for Linux.
                When I'm not playing retro games or tweaking my Linux setup, I'm contributing to
                open-source projects or experimenting with new tech.
            </p>
            <p>My site has <strong>no ads, no tracking or analytics, no sponsored posts, and no paywall</strong>.
                It's a place for genuine content, driven by passion rather than profit.</p>
            <p>You can also follow me on Twitter or Github, blah blah. Also if you're interested in communication or
                blah blah you can blah blah blah <a href="#">blah</a> blah.</p>
            <img src={Photo1} alt="Photo taken from bridge"/>

            <h2>Contact</h2>
            <p>Send me an email to say hi, or connect via the socials.</p>
            <ul>
                {SOCIAL_LINKS.map((social) => (
                    <li><a href={social.url}>{social.title}</a></li>
                ))}
            </ul>

            <h2>Tools</h2>
            <h3>Software</h3>
            <p>This website is hosted on X and uses X.</p>
            <ul>
                <li><strong>OS: </strong>
                    <ul>
                        <li>Desktop: <a href="https://archlinux.org/">Arch Linux x86_64</a> with <a href="https://kde.org/plasma-desktop/">Plasma Desktop</a></li>
                        <li>Laptop: <a href="https://asahilinux.org/fedora/">Asahi Fedora Remix</a> with <a href="https://kde.org/plasma-desktop/">Plasma Desktop</a></li>
                        <li>Mobile: <a href="https://lineageos.org/">LineageOS 21</a></li>
                    </ul>
                </li>
                <li><strong>Coding: </strong>VSCode, WebStorm, IDEA, vim</li>
                <li><strong>Terminal: </strong>Konsole and Yakuake</li>
            </ul>

            <h3>Hardware</h3>
            <ul>
                <li><strong>Laptop: </strong>Macbook Air M1 8/256 (2020)</li>
                <li>
                    <strong>PC</strong>
                    <ul>
                        <li>CPU: AMD Ryzen 5 3600</li>
                        <li>Motherboard: ASRock B450M S2H V2</li>
                        <li>GPU: Nvidia GTX 1070 8Gb</li>
                        <li>RAM: Fury 16 GB 3600</li>
                        <li>Storage: 512 Gb PM99 NVME SSD + 2x2Tb HDD</li>
                    </ul>
                </li>
                <li><strong>Monitor: </strong>NEC MultiSync EA234WMi</li>
                {/*<li><strong>Keyboard: </strong>Random crap with terrible backlight</li>*/}
                {/*<li><strong>Mouse: </strong>Bloody J90S</li>*/}
                {/*<li><strong>Headphones: </strong>Oppo Enco Buds2</li>*/}
            </ul>

            {/*<h2>Miscellaneous</h2>*/}
            {/*<ul>*/}
            {/*    <li><a href="#">Resume</a></li>*/}
            {/*    <li><a href="#">Blah</a></li>*/}
            {/*</ul>*/}
        </>
    );
};

export {AboutPage};