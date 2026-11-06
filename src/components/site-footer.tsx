import {badges} from '@/data/badges';

export function SiteFooter() {
    return (
        <footer className="mt-12 flex flex-col gap-4 border-t border-dashed border-border py-6 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            <div className="flex flex-wrap gap-1">
                {badges.map(badge => {
                    const image = (
                        <img
                            className="h-[31px] w-[88px] [image-rendering:pixelated]"
                            src={badge.imageUrl}
                            alt={badge.label}
                            width="88"
                            height="31"
                            loading="lazy"
                        />
                    );

                    if (!badge.targetUrl) {
                        return (
                            <span key={badge.imageUrl} className="inline-flex">
                                {image}
                            </span>
                        );
                    }

                    return (
                        <a
                            key={badge.imageUrl}
                            href={badge.targetUrl}
                            aria-label={badge.label}
                            className="inline-flex"
                        >
                            {image}
                        </a>
                    );
                })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <span>made with love</span>
                <span className="normal-case">{APP_VERSION}</span>
            </div>
        </footer>
    );
}
