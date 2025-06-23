import Link from 'next/link';

export interface NavigationLinkProps {
  href: string;
  title: string;
}

export const NavigationLink = (props: NavigationLinkProps) => {
  return (
    <Link className="text-sm text-gray-200 hover:text-white" href={props.href}>
      {props.title}
    </Link>
  );
};
