import showdown from 'showdown';

const fileRegex = /\.(md)$/;

export default function markdownPrecompile() {
    return {
        name: 'markdown-precompile',

        transform(src: string, id: string) {
            if (fileRegex.test(id)) {
                const converter = new showdown.Converter();
                const html = converter.makeHtml(src);

                return {
                    code: `export default ${JSON.stringify(html)};`,
                    map: null,
                };
            }

            return null;
        },
    };
}
