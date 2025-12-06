import {ViewsCount} from '@/components/views-count';
import {TextBlock} from '@/components/blog/text-block';
import {OrderedList} from '@/components/blog/ordered-list';

const worksWell = [
    {
        title: '1. Rendering games',
        content:
            "Yes, it handles 3D rendering reasonably well. But for this performance level, you'd need at least a PRO version with a lot of RAM.",
    },
    {
        title: '2. Microphone, charging, keyboard',
        content:
            'Works just fine. The keyboard backlight configuration is also supported.',
    },
];

const worksPoorly = [
    {
        title: '1. Rendering UI',
        content:
            'A lot of stutter. Even the Christmas snowflakes on my winter-themed website decorations are laggy.',
    },
    {
        title: '2. Smooth scrolling',
        content:
            "Because of the stutter, you can't just scroll through your browser comfortably.",
    },
    {
        title: '3. Overall power efficiency',
        content:
            'Most of the time it works well, but you need to reboot often to maintain it.',
    },
    {
        title: '4. Sound',
        content:
            'The sound from the internal speakers is terrible, especially when you raise the volume.',
    },
    {
        title: '5. Camera',
        content:
            "The camera doesn't work in most native applications, though it works okay in the browser.",
    },
    {
        title: '6. A lot of other stuff...',
        content:
            'Swap performance is bad, SELinux is buggy, and there are features you will simply have to disable.',
    },
];

const notWorking = [
    {
        title: '1. HDMI/DisplayPort over Type-C hub',
        content: "I really would like to use a second monitor, but I can't.",
    },
    {
        title: '2. A lot of software',
        content:
            "Some apps just don't work. Some fail because of the 16k memory page size, and others just have no ARM port.",
    },
    {
        title: '3. Sleep mode',
        content:
            'Even with no apps running and the lid closed, the battery drains while sleeping.',
    },
];

export default function AsahiLinuxBlogPost() {
    return (
        <div className="flex flex-col gap-6 mt-2">
            <ViewsCount size="default" />

            <header>
                <h1 className="font-bold text-3xl">
                    Why I abandoned the idea of using Asahi Linux.
                </h1>
            </header>

            <section className="flex flex-col gap-2">
                <TextBlock>
                    I am a Linux guy. I've used it on my VPS and home lab for
                    years. On my desktop computer, I run Arch Linux exclusively,
                    and I fully enjoy it for playing games, coding, and
                    everything else. Just for fun, I even have two Android
                    phones running Ubuntu Touch and postmarketOS.
                </TextBlock>
            </section>

            <section className="flex flex-col gap-2">
                <TextBlock>
                    But on my Macbook Air M1 (which I use often due to power
                    outages here in Ukraine), I have macOS. Most of the time it
                    works for me, but sometimes... I just can't do the things I
                    want. I also hate the keyboard shortcuts in the IDEs and
                    browsers that I am forced to use.
                </TextBlock>
                <TextBlock>
                    This often triggers me to think about installing Linux on my
                    laptop. But unfortunately, the only project attempting to
                    bring full-featured Linux to Apple Silicon (M-series) CPUs -
                    Asahi Linux is progressing really slowly. Especially with
                    the recent news, where many talented developers have left
                    the project.
                </TextBlock>
            </section>

            <section className="flex flex-col gap-2">
                <TextBlock>
                    Before writing this blog post, I decided to install Asahi
                    again to see what has changed compared to its state in late
                    2024.
                </TextBlock>
                <TextBlock>
                    <strong>Nothing for me!</strong> Many of the recent upgrades
                    focus on gaming and Steam. Gaming? Are you kidding me? Most
                    Asahi users are praying to be able to write code on it, not
                    play games via slow x86_64 CPU emulation.
                </TextBlock>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">What works well?</h2>
                <OrderedList items={worksWell} />
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">
                    What is at least trying to work?
                </h2>
                <OrderedList items={worksPoorly} />
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">What does not work?</h2>
                <OrderedList items={notWorking} />
            </section>
            <section className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">Conclusion</h2>
                <TextBlock>
                    For now, I accept my fate that{' '}
                    <strong>I will use macOS.</strong>
                </TextBlock>
                <TextBlock>
                    After all, compared to Windows, it really isn't so bad. It
                    is UNIX-based, so my workflow feels familiar, and most CLI
                    tools and compilers are easily available via Homebrew. The
                    hardware is incredible, and in a time of power outages, I
                    need efficiency more than using Linux on everything :3
                </TextBlock>
            </section>
        </div>
    );
}
