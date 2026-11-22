import {useEffect} from 'react';
import {Panel} from '@/components/panel';
import {links, linksIntro} from '@/data/links';

export function LinksPage() {
    useEffect(() => {
        document.title = 'kotleni — links';
    }, []);

    return (
        <div>
            <header>
                <div className="docs-kicker">
                    <span className="docs-accent">links</span>
                </div>
                <h1 className="docs-page-title">Links.</h1>
                <p className="docs-lead">{linksIntro}</p>
            </header>

            <Panel title="links">
                <dl className="docs-fields">
                    {links.map(link => (
                        <div key={link.name} className="docs-field-row">
                            <dt className="docs-field-term">{link.name}</dt>
                            <dd className="docs-field-desc docs-truncate">
                                <a href={link.url} title={link.url}>
                                    {link.display}
                                </a>
                            </dd>
                        </div>
                    ))}
                </dl>
            </Panel>
        </div>
    );
}
