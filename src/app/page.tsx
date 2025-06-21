import {Button} from '@/components/ui/button';
import {NavigationLink} from '@/components/ui/navigation-link';

const NavigationBar = () => {
  return (
    <div className="h-18 bg-neutral-900 flex items-center justify-center w-screen">
      <div className="w-6/10 sm:w-9/10 md:w-8/10 lg:w-6/10 h-full flex items-center p-8 gap-2">
        <div className="font-bold text-xl">KOTLENI</div>
        <div className="w-full flex items-center justify-end gap-4">
          <NavigationLink href="/" title="Home" />
          <NavigationLink href="/" title="Articles" />
          <NavigationLink href="/" title="Projects" />
          <NavigationLink href="/" title="Sandbox" />
          <NavigationLink href="/" title="About me" />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="">
      <NavigationBar />
      <div className="flex items-center justify-center p-4">
        <Button variant="default">About me</Button>
      </div>
    </div>
  );
}
