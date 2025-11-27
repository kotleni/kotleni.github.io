import {ReactNode} from 'react';

type ListItem = {
    title: string;
    content: ReactNode;
};

export function OrderedList({items}: {items: ListItem[]}) {
    return (
        <ol className="pl-1 text-foreground/80 list-inside">
            {items.map((item, index) => (
                <li key={index}>
                    <p className="font-bold text-foreground/90">{item.title}</p>
                    <div className="pl-4">{item.content}</div>
                </li>
            ))}
        </ol>
    );
}
