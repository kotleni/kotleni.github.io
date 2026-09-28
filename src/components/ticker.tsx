const items = [
    'pew pew, i got-cha',
    'i use arch linux btw!',
    'best viewed in any browser',
    'who ate my cookies?',
    'i bring retro-technologies back to life',
];

const separator = ' | ';

const line = separator + items.join(separator);

export function Ticker() {
    return (
        <div className="marquee border-b border-border bg-card text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            <div className="marquee-track py-1">
                <span className="whitespace-pre px-2">{line}</span>
                <span
                    aria-hidden="true"
                    className="whitespace-pre px-2 motion-reduce:hidden"
                >
                    {line}
                </span>
            </div>
        </div>
    );
}
