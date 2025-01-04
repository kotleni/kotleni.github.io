import './SocialItem.scss';

export default function SocialItem(props: { link: string, title: string }) {
    return (
        <li className="social-item"><a className="social-link" href={props.link}>[{props.title}]</a></li>
    );
}