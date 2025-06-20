import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="h-14 flex items-center justify-center gap-2">
        <Link href="/">Home</Link>
        <Link href="/">Articles</Link>
        <Link href="/">Projects</Link>
        <Link href="/">Playground</Link>
        <Link href="/">About me</Link>
      </div>
    </>
  );
}
