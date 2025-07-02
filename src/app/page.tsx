import Link from 'next/link';

function LeftSide() {
    return (
        <div className="w-full h-full pt-24">
            <Link href="/" className="text-5xl font-bold text-slate-200">
                Viktor Varenik
            </Link>
            <h2 className="text-2xl font-medium mt-2 text-slate-200">
                Full-stack Web Developer
            </h2>
            <p className="mt-3 leading-normal">
                I build X fill me please, i love eat bananas when i am lonely.
            </p>
        </div>
    );
}

function RightSide() {
    return (
        <div className="w-full h-full pt-24">
            <p>
                I'm a software engineer, open-source enthusiast, and retro tech
                lover. I started my career as an Android developer, spending
                three years crafting mobile experiences before shifting my focus
                to web development in 2024.
            </p>
            <p>
                I've been started writing on this blog for the past decade,
                sharing insights on coding, open-source projects, and my passion
                for all things retro. Also, by the way — I use Arch, btw. Also i
                enjoy languages, learning new things, coding, and making cool
                stuff for Linux. When I'm not playing retro games or tweaking my
                Linux setup, I'm contributing to open-source projects or
                experimenting with new tech.
            </p>
        </div>
    );
}

export default function Home() {
    return (
        <div className="w-screen h-screen flex justify-center text-slate-400">
            <div className="container xl:max-w-300 flex flex-row">
                <LeftSide />
                <RightSide />
            </div>
        </div>
    );
}
