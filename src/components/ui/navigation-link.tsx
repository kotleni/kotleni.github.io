import Link from 'next/link';

export interface NavigationLinkProps {
  href: string;
  title: string;
}

export const NavigationLink = (props: NavigationLinkProps) => {
  return (
    <Link className="hover:text-primary" href={props.href}>
      {props.title}
    </Link>
  );
};
