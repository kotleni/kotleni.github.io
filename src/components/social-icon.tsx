interface SocialIconProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    url: string;
    label: string;
}

export function SocialIcon({Icon, url, label}: SocialIconProps) {
    return (
        <a href={url} target="_blank">
            <Icon className="size-4 cursor-pointer hover:text-primary" aria-label={label} />
        </a>
    );
}
