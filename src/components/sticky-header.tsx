export interface StickyHeaderProps {
    title: string;
}

export function StickyHeader(props: StickyHeaderProps) {
    return (
        <div className="sticky top-0 backdrop-blur-sm bg-slate-900/80 z-10 py-2 mt-8 px-8">
            <h2 className="text-sm font-bold uppercase text-slate-200">
                {props.title}
            </h2>
        </div>
    );
}
