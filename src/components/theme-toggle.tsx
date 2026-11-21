import {useEffect, useState} from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'y2k-theme';

const modes: ThemeMode[] = ['light', 'dark', 'auto'];

function readMode(): ThemeMode {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'auto') {
            return stored;
        }
    } catch {
        return 'auto';
    }
    return 'auto';
}

function applyMode(mode: ThemeMode) {
    const dark =
        mode === 'dark' ||
        (mode === 'auto' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', dark ? '#221c24' : '#faf2ee');
}

export function ThemeToggle() {
    const [mode, setMode] = useState<ThemeMode>(readMode);

    useEffect(() => {
        applyMode(mode);
    }, [mode]);

    const choose = (next: ThemeMode) => {
        setMode(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            return;
        }
    };

    return (
        <span className="docs-theme-toggle">
            <span>theme:</span>
            {modes.map(item => (
                <span key={item}>
                    {item === mode ? (
                        <b>{item}</b>
                    ) : (
                        <button
                            type="button"
                            className="docs-link-btn"
                            aria-pressed={item === mode}
                            onClick={() => choose(item)}
                        >
                            {item}
                        </button>
                    )}
                </span>
            ))}
        </span>
    );
}
