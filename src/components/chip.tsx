interface ChipProps {
    tag: string;
}

export function Chip(props: ChipProps) {
    return (
        <span
            className="text-xs font-medium mr-2 px-3 py-1 bg-primary/5 text-primary rounded-full"
            key={props.tag}
        >
            {props.tag}
        </span>
    );
}
