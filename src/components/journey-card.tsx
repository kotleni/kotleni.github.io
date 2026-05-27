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
        <div className="journey-item group">
            <div className={cn('journey-line')}></div>
            <div className="journey-body">
                <div className="journey-head">
                    <div>
                        <p className="journey-title">{props.title}</p>
                        <div
                            className="journey-company"
                            hidden={props.companyTitle === undefined}
                        >
                            <p>at</p>
                            <a
                                hidden={props.companyUrl === undefined}
                                href={props.companyUrl}
                                className="text-link"
                            >
                                {props.companyTitle}
                            </a>
                            <p
                                hidden={props.companyUrl !== undefined}
                                className="text-link"
                            >
                                {props.companyTitle}
                            </p>
                        </div>
                    </div>
                    <div className="journey-date">{props.workingDates}</div>
                </div>
                <p>{props.description}</p>
            </div>
        </div>
    );
}
