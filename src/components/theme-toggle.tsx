import {cn} from '@/lib/utils';
import {themeLabels, themePreferences, useTheme} from '@/lib/theme';

export function ThemeToggle() {
    const {preference, theme, setPreference} = useTheme();

    return (
        <div
            className="win flex items-center p-0.5"
            role="group"
            aria-label="color theme"
        >
            {themePreferences.map(option => (
                <button
                    key={option}
                    type="button"
                    onClick={() => setPreference(option)}
                    aria-pressed={preference === option}
                    title={`${themeLabels[option]} theme`}
                    className={cn(
                        'px-1 py-0.5 text-[0.65rem] lowercase transition-colors',
                        'text-muted-foreground hover:text-foreground',
                        preference === option &&
                            'bg-accent text-accent-foreground',
                    )}
                >
                    {themeLabels[option]}
                </button>
            ))}
            <span className="sr-only" aria-live="polite">
                {`${theme} theme applied`}
            </span>
        </div>
    );
}
