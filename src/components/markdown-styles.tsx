import React from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'; // For HTML
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import typescript from 'highlight.js/lib/languages/typescript';
import {MDXComponents} from 'mdx/types';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', xml); // xml handles html
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('typescript', typescript);

export const H1 = ({children}: React.PropsWithChildren) => (
    <h1 className="text-4xl font-extrabold mb-4 mt-8">{children}</h1>
);
export const H2 = ({children}: React.PropsWithChildren) => (
    <h2 className="text-3xl font-bold mb-3 mt-6">{children}</h2>
);
export const H3 = ({children}: React.PropsWithChildren) => (
    <h3 className="text-2xl font-semibold mb-2 mt-5">{children}</h3>
);
export const H4 = ({children}: React.PropsWithChildren) => (
    <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
);
export const H5 = ({children}: React.PropsWithChildren) => (
    <h5 className="text-lg font-semibold mb-1 mt-3">{children}</h5>
);
export const H6 = ({children}: React.PropsWithChildren) => (
    <h6 className="text-base font-semibold mb-1 mt-2">{children}</h6>
);
export const P = ({children}: React.PropsWithChildren) => (
    <p className="text-base leading-relaxed mb-4">{children}</p>
);
export const A = ({
    children,
    href,
}: React.PropsWithChildren<{href: string}>) => (
    <a href={href} className="text-blue-600 hover:underline">
        {children}
    </a>
);
export const Ul = ({children}: React.PropsWithChildren) => (
    <ul className="list-disc list-inside mb-4 ml-4">{children}</ul>
);
export const Ol = ({children}: React.PropsWithChildren) => (
    <ol className="list-decimal list-inside mb-4 ml-4">{children}</ol>
);
export const Li = ({children}: React.PropsWithChildren) => (
    <li className="mb-2">{children}</li>
);
export const Blockquote = ({children}: React.PropsWithChildren) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
    </blockquote>
);
export const Strong = ({children}: React.PropsWithChildren) => (
    <strong className="font-bold">{children}</strong>
);
export const Em = ({children}: React.PropsWithChildren) => (
    <em className="italic">{children}</em>
);

export const Pre = ({
    children,
    className,
}: React.PropsWithChildren<{className?: string}>) => {
    // Extract the code string from children.props.children
    const codeString =
        children &&
        typeof children === 'object' &&
        'props' in children &&
        children.props &&
        typeof children.props === 'object' &&
        'children' in children.props &&
        typeof children.props.children === 'string'
            ? children.props.children
            : Array.isArray(children)
              ? children.join('')
              : String(children);

    const language = className
        ? className.replace(/language-/, '')
        : 'plaintext';
    let highlightedCode = codeString;

    try {
        if (hljs.getLanguage(language)) {
            highlightedCode = hljs.highlight(codeString, {
                language: language,
            }).value;
        } else {
            // Fallback to auto-detection if specific language is not registered
            highlightedCode = hljs.highlightAuto(codeString).value;
        }
    } catch (error) {
        console.error('Highlighting error:', error);
    }

    return (
        <pre
            className="p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono bg-gray-800 text-white"
            dangerouslySetInnerHTML={{__html: highlightedCode}}
        />
    );
};

export const Table = ({children}: React.PropsWithChildren) => (
    <table className="w-full text-left border-collapse my-4">{children}</table>
);
export const Thead = ({children}: React.PropsWithChildren) => (
    <thead className="bg-gray-100">{children}</thead>
);
export const Tbody = ({children}: React.PropsWithChildren) => (
    <tbody>{children}</tbody>
);
export const Tr = ({children}: React.PropsWithChildren) => (
    <tr className="border-b border-gray-200">{children}</tr>
);
export const Th = ({children}: React.PropsWithChildren) => (
    <th className="py-2 px-4 font-bold uppercase text-sm text-gray-600">
        {children}
    </th>
);
export const Td = ({children}: React.PropsWithChildren) => (
    <td className="py-2 px-4 border-r border-gray-200 last:border-r-0">
        {children}
    </td>
);
export const Hr = () => <hr className="my-8 border-t border-gray-300" />;

export const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,
    a: A,
    ul: Ul,
    ol: Ol,
    li: Li,
    blockquote: Blockquote,
    strong: Strong,
    em: Em,
    pre: Pre,
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
    hr: Hr,
} satisfies MDXComponents;
