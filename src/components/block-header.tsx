export interface StickyHeaderProps {
    emoji: string;
    title: string;
}

export function BlockHeader(props: StickyHeaderProps) {
    return (
        <div className="z-10 md:pl-4 pb-4 mt-(--blocks-top-margin)">
            <h2 className="text-sm font-bold uppercase text-slate-200">
                <span>{props.emoji}</span> {props.title}
            </h2>
        </div>
    );
}
