import {BlockHeader} from '@/components/block-header';

export function AboutPart() {
    return (
        <>
            <BlockHeader emoji="👋" title="About" />
            <p className="mb-4 md:px-4 pt-4">
                Hi, I'm a software engineer, open-source enthusiast, and tech
                lover. Professionally, my journey began in mobile, where I spent
                three years building Android apps. In 2024, I brought that
                experience to the web, embracing a new set of challenges and
                technologies.
            </p>
            <p className="mb-4 md:px-4">
                My passion for technology extends beyond the application layer.
                I enjoy working closer to the metal with C/C++ and Python,
                especially within the Linux ecosystem. This enthusiasm carries
                over into my hobbies as a 'ricing' enthusiast and hardware geek.
                I'm driven by a deep curiosity to understand and optimize the
                tools I use, from the silicon all the way up to the UI.
            </p>
        </>
    );
}
