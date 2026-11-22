import {badges} from '@/data/badges';

export function SiteFooter() {
    return (
        <footer className="docs-footer">
            <div className="docs-footer-inner">
                <div className="docs-badges">
                    {badges.map(badge => {
                        const image = (
                            <img
                                src={badge.imageUrl}
                                alt={badge.label}
                                width="88"
                                height="31"
                                loading="lazy"
                            />
                        );

                        if (!badge.targetUrl) {
                            return <span key={badge.imageUrl}>{image}</span>;
                        }

                        return (
                            <a
                                key={badge.imageUrl}
                                href={badge.targetUrl}
                                aria-label={badge.label}
                            >
                                {image}
                            </a>
                        );
                    })}
                </div>
                <div className="docs-footer-row">
                    <span>made with love</span>
                    <span>{APP_VERSION}</span>
                </div>
            </div>
        </footer>
    );
}
