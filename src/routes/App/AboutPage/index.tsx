import Photo1 from "../../../assets/photo1.jpeg";

const AboutPage: React.FC = () => {
    return (
        <>
            <header className="hero hero-page"><h1>About Me</h1></header>
            <p>Hey, I'm Viktor! I XXXX, and fill me please. This text is useless, i just need to write it later. It's
                just a stub, and you are so kind if you're reading this.</p>
            <p>Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                blah blah blah blah blah blah blah blah blah blah blah. Blah blah.</p>
            <p>My site has <strong>no ads, no tracking or analytics, no sponsored posts and no paywall.</strong> Bla
                blah blah. My motivation is blah blah blah blah. BLah blah!</p>
            <p>You can also follow me on Twitter or Github, blah blah. Also if you're interested in communication or
                blah blah you can blah blah blah <a href="#">blah</a> blah.</p>
            <img src={Photo1} alt="Photo taken from bridge"/>

            <h2>Contact</h2>
            <p>Send me an email to say hi, or connect via the socials.</p>
            <ul>
                <li>Blah 0!</li>
                <li>Blah 1!</li>
                <li>Blah 2!</li>
                <li>Blah 3!</li>
            </ul>

            <h2>What I'm Doing Now</h2>
            <p>
                <em>Updated January Xst, 2025</em>
            </p>
            <ul>
                <li>Working full time</li>
                <li>Building new website for the sixth time</li>
                <li>Learning something new</li>
                <li>Watching <b>Mr. Robot</b> tv series</li>
                <li>Doing blah blah blah</li>
            </ul>

            <h2>Tools</h2>
            <h3>Software</h3>
            <p>This website is hosted on X and uses X.</p>
            <ul>
                <li><strong>OS: </strong>Arch Linux with KDE</li>
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

            <h2>Miscellaneous</h2>
            <ul>
                <li><a href="#">Resume</a></li>
                <li><a href="#">Blah</a></li>
            </ul>
        </>
    );
};

export {AboutPage};