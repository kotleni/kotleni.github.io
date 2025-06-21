import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="h-full w-full flex flex-col bg-jb">
        <section className="h-full flex-grow flex flex-col items-start justify-center p-24 text-start">
          <h1 className="text-6xl font-bold mb-4">Viktor Varenik</h1>
          <p className="text-4xl font-light mb-8 max-w-2xl">
            Full-Stack Web Developer specializing in building modern
            applications with Next.js, TypeScript, NestJS, and React.
          </p>
          <Button variant="default" size="lg">
            Contact Me
          </Button>
        </section>
        {/*<section className="p-24">*/}
        {/*  <h1 className="text-6xl font-bold mb-4">Hobbies</h1>*/}
        {/*  <p className="text-4xl font-light mb-8 max-w-2xl">*/}
        {/*    Section about my hobbies and interests.*/}
        {/*  </p>*/}
        {/*</section>*/}
        <section className="flex flex-col gap-4 p-4 text-sm bg-neutral-900 text-neutral-400">
          <div className="flex flex-row justify-start gap-4">
            <Link
              href="https://github.com/kotleni/kotleni.github.io"
              target="_blank"
            >
              Source code
            </Link>
            <Link href="/">Servers availability</Link>
            <Link href="/">Take a hug</Link>
          </div>
          <div className="flex flex-row justify-between">
            <p>Copyright © 2023-2025 Viktor Varenik</p>
            <p>Made with ❤️ and TypeScript</p>
          </div>
        </section>
      </div>
    </>
  );
}
