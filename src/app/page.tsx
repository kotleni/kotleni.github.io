'use client';
import {SocialIcon} from '@/components/social-icon';
import {GithubLogo} from '@/icons/github-logo';
import {GmailLogo} from '@/icons/gmail-logo';
import {LinkedinLogo} from '@/icons/linkedin-logo';
import {TelegramLogo} from '@/icons/telegram-logo';
import Avatar from '@/kotleni2.jpg';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col gap-4 pt-4">
            <section className="flex flex-row gap-4">
                <Image
                    src={Avatar}
                    alt="kotleni profile picture"
                    className="size-20 rounded-full"
                />
                <div className="flex flex-col justify-center gap-1">
                    <h2 className="text-xl">Hey👋, I'm Viktor</h2>
                    <p>Full-stack Software Engineer | Ukraine</p>
                    <div className="flex flex-row gap-3">
                        <SocialIcon
                            Icon={GmailLogo}
                            url="mailto:yavarenikya@gmail.com"
                        />
                        <SocialIcon
                            Icon={LinkedinLogo}
                            url="https://www.linkedin.com/in/kotleni/"
                        />
                        <SocialIcon
                            Icon={TelegramLogo}
                            url="https://t.me/kotleni"
                        />
                        <SocialIcon
                            Icon={GithubLogo}
                            url="https://github.com/kotleni"
                        />
                    </div>
                </div>
            </section>
            <section className="mt-4">
                <p className="font-semibold">about me.</p>
                <p className="mt-2">
                    i'm a passionate full-stack developer who learns and
                    transforms complex problems into simple, beautiful, and
                    intuitive solutions through development and design.
                </p>
            </section>
        </div>
    );
}
