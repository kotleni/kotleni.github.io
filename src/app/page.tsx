import {Button} from '@/components/ui/button';
import {NavigationLink} from '@/components/ui/navigation-link';

export default function Home() {
  return (
    <>
      <div className="h-14 flex items-center justify-end p-8 gap-2">
        <NavigationLink href="/" title="Home" />
        <NavigationLink href="/" title="Articles" />
        <NavigationLink href="/" title="Projects" />
        <NavigationLink href="/" title="Sandbox" />
        <NavigationLink href="/" title="About me" />
      </div>
      <div className="flex items-center justify-center p-4">
        <Button variant="default">About me</Button>
      </div>
    </>
  );
}
