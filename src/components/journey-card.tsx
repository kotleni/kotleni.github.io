import {cn} from '@/lib/utils';

interface JourneyCardProps {
    title: string;
    companyTitle: string | undefined;
    companyUrl: string | undefined;
    workingDates: string;
    description: string;
}

export function JourneyCard(props: JourneyCardProps) {
    return (
        <div className="group flex flex-row gap-[16px] w-full py-2">
            <div
                className={cn(
                    'min-h-full min-w-[2px] bg-neutral-200 group-hover:bg-primary',
                )}
            ></div>
            <div className="w-full">
                <div className="flex justify-between min-w-full text-sm">
                    <div className="text-xs">
                        <p className="text-[16px]">{props.title}</p>
                        <div
                            className="flex flex-row gap-1"
                            hidden={props.companyTitle === undefined}
                        >
                            <p>at,</p>
                            <a
                                hidden={props.companyUrl === undefined}
                                href={props.companyUrl}
                                className="underline"
                            >
                                {props.companyTitle}
                            </a>
                            <p
                                hidden={props.companyUrl !== undefined}
                                className="underline"
                            >
                                {props.companyTitle}
                            </p>
                        </div>
                    </div>
                    <div className="text-md">{props.workingDates}</div>
                </div>
                <p className="mt-2 text-sm">{props.description}</p>
            </div>
        </div>
    );
}
