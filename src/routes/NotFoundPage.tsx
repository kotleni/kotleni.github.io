import {useEffect} from 'react';

export function NotFoundPage() {
    useEffect(() => {
        document.title = 'kotleni — not found';
    }, []);

    return (
        <div>
            <header>
                <div className="docs-kicker docs-accent">error 404</div>
                <h1 className="docs-page-title">Post not found.</h1>
                <p className="docs-lead">
                    This one does not exist, or moved somewhere quieter.
                </p>
            </header>
        </div>
    );
}
