import { Link } from "react-router-dom";

type Button = { title: string, url: string, target: string /* aka _blank */ };
type CardItemProps = { title: string, description: string, year: string, url: string, buttons: Button[] };
type Props = { cards: CardItemProps[] };

const CardItem: React.FC<CardItemProps> = (props) => {
    return (
        <div className="card">
            <time>{props.year}</time>
            <Link to={props.url} target="_blank"
               rel="noreferrer">{props.title}</Link><p>{props.description}</p>
            <div className="card-links">
                {props.buttons.map((button) => (
                    <Link className="button small" to={button.url} target={button.target}>{button.title}</Link>
                ))}
            </div>
        </div>
    );
};

const ProjectsCards: React.FC<Props> = (props) => {
    return (
        <div className="cards">
            {props.cards.map((card) => (
                <CardItem
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    year={card.year}
                    url={card.url}
                    buttons={card.buttons} />
            ))}
        </div>
    );
};

export {ProjectsCards};
export type {Button, CardItemProps};