export interface StickyHeaderProps {
    title: string;
}

export function BlockHeader(props: StickyHeaderProps) {
    return (
        <div className="z-10 pl-4 mt-(--blocks-top-margin)">
            <h2 className="text-sm font-bold uppercase text-slate-200">
                {props.title}
            </h2>
        </div>
    );
}
