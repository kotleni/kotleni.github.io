'use client';

import {usePathname} from 'next/navigation';
import Link from 'next/link';
import Image, {StaticImageData} from 'next/image';
import SnakeGameScreenshot from '@/app/sandbox/snakegame/screenshot1.png';
import {Title} from '@/components/blog/title';

interface SandboxApp {
    name: string;
    description: string;
    url: string;
    preview: StaticImageData;
    isDarkBg: boolean;
}

const apps: SandboxApp[] = [
    {
        name: 'Snake',
        description: 'A 2D snake game with a lot of glows.',
        url: '/sandbox/snakegame',
        preview: SnakeGameScreenshot,
        isDarkBg: true,
    },
];

export default function SandboxPage() {
    const pathName = usePathname();

    return (
        <div className="flex flex-col pt-4 gap-4">
            <Title text="Sandbox apps" />
            <div className="flex flex-wrap justify-center gap-4 sm:p-6">
                {apps.map(app => (
                    <Link
                        key={`${app.name}`}
                        href={`${app.url}?is_fullsized=1&ref=${pathName}&is_darkbg=${app.isDarkBg ? '1' : 0}`}
                        className="w-full max-w-xs overflow-hidden border border-accent/50 bg-accent hover:bg-accent/80"
                    >
                        {/* Image Container */}
                        <div className="border-b border-accent/50">
                            <Image
                                src={app.preview}
                                alt={`Screenshot of ${app.name}`}
                                width={320}
                                height={180}
                                className="h-30 w-full object-cover"
                            />
                        </div>

                        {/* Content Container */}
                        <div className="p-2">
                            <h3 className="text-sm font-semibold text-accent-foreground">
                                {app.name}
                            </h3>
                            <p className="mt-1 text-sm text-accent-foreground/80">
                                {app.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
