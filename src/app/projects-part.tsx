import {BlockHeader} from '@/components/block-header';
import {ProjectCard} from '@/components/project-card';

export function ProjectsPart() {
    return (
        <>
            <BlockHeader emoji="💻" title="Projects" />
            <ProjectCard
                title="Private web site"
                description="This portfolio is a live project I designed and built from the ground up. It serves as a practical showcase of my skills in creating modern, responsive, and performant web applications using Next.js, React, TypeScript, and Tailwind CSS."
                githubUrl="https://github.com/kotleni/kotleni.github.io"
                tags={[
                    'nodejs',
                    'typescript',
                    'reactjs',
                    'nextjs',
                    'tailwindcss',
                ]}
            />
            <ProjectCard
                title="PixelDash"
                description="Create, collaborate, and compete on a massive open-source pixel canvas platform. This project goes beyond traditional pixel boards by allowing users to own territory, protect their art, and even import images to bring their vision to life."
                githubUrl="https://github.com/kotleni/pixel-dash"
                tags={[
                    'nodejs',
                    'typescript',
                    'reactjs',
                    'nextjs',
                    'websockets',
                ]}
            />
        </>
    );
}
