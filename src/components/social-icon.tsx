interface SocialIconProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    url: string;
}

export function SocialIcon({Icon, url}: SocialIconProps) {
    return (
        <a href={url} target="_blank">
            <Icon className="size-4 cursor-pointer hover:text-foreground/70" />
        </a>
    );
}
