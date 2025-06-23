import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10">
      <p className="text-5xl font-bold">Hey, I'm Viktor!</p>
      <p className="text-lg pt-6">
        I'm a software engineer, open-source enthusiast, and retro tech lover.
        <strong> I started my career as an Android developer</strong>, spending
        three years crafting mobile experiences{' '}
        <strong>before shifting my focus to web development in 2024</strong>.
        I've been started writing on [oh, you really reading this? i love u
        sm... wanna spend the night with me?] this blog for the past decade,
        sharing insights on coding, open-source projects, and my passion for all
        things retro. Also, by the way — <i>I use Arch</i>, btw.
      </p>
      <p className="text-lg pt-6">
        Also i enjoy languages, learning new things, coding, and making cool
        stuff for Linux. When I'm not playing retro games or tweaking my Linux
        setup, I'm contributing to open-source projects or experimenting with
        new tech.
      </p>
      <p className="text-lg pt-6">
        On this site, you can read some of my{' '}
        <Link href="/" className="text-violet-400 hover:text-violet-500">
          articles
        </Link>
        , check my open source{' '}
        <Link href="/" className="text-violet-400 hover:text-violet-500">
          projects
        </Link>{' '}
        or learn more
        <Link href="/" className="text-violet-400 hover:text-violet-500">
          {' '}
          about me 💾
        </Link>
        .
      </p>
    </div>
  );
}
