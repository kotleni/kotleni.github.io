import {useSearchParams} from 'next/navigation';
import {useMemo, useCallback} from 'react';
import {Extension} from '@/extentions';

const validExtensionValues = new Set<string>(Object.values(Extension));

/**
 * A custom hook to read and manage extensions from the 'extensions' URL search parameter.
 *
 * @returns An object with:
 *  - `isEnabled`: A function to check if a specific extension is enabled.
 *  - `enabledExtensions`: A Set containing all currently enabled extensions.
 */
export const useExtensions = () => {
    const searchParams = useSearchParams();

    const enabledExtensions = useMemo(() => {
        // 1. Get the 'extensions' parameter from the URL.
        const extensionsParam = searchParams.get('extensions');

        // If the parameter doesn't exist, return an empty Set.
        if (!extensionsParam) {
            return new Set<Extension>();
        }

        // 2. Split the string by spaces (URL decodes '+' to a space).
        const urlValues = extensionsParam.split(' ');

        // 3. Filter the values to include only those that are valid Extensions.
        const validAndEnabled = urlValues
            .filter((value): value is Extension =>
                validExtensionValues.has(value),
            )
            .reduce((acc, current) => {
                acc.add(current);
                return acc;
            }, new Set<Extension>());

        return validAndEnabled;
    }, [searchParams]);

    /**
     * Checks if a given extension is present in the enabled set.
     * `useCallback` ensures this function reference is stable between re-renders
     * unless `enabledExtensions` changes.
     */
    const isEnabled = useCallback(
        (extension: Extension): boolean => {
            return enabledExtensions.has(extension);
        },
        [enabledExtensions],
    );

    return {isEnabled, enabledExtensions};
};
