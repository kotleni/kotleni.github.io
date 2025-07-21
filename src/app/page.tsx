'use client';
import {GithubLogo} from '@/icons/github-logo';
import {GmailLogo} from '@/icons/gmail-logo';
import {LinkedinLogo} from '@/icons/linkedin-logo';
import {TelegramLogo} from '@/icons/telegram-logo';
import Avatar from '@/kotleni2.jpg';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-row gap-4">
                <Image
                    src={Avatar}
                    alt="kotleni profile picture"
                    className="size-20 rounded-full"
                />
                <div className="flex flex-col justify-center gap-1">
                    <h2 className="text-xl">Hey👋, I'm Viktor</h2>
                    <p>Full-stack Software Engineer | Ukraine</p>
                    <div className="flex flex-row gap-2">
                        <GmailLogo className="size-5" />
                        <LinkedinLogo className="size-5" />
                        <GithubLogo className="size-5" />
                        <TelegramLogo className="size-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
