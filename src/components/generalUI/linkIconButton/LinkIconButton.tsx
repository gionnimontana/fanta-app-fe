import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import s from './LinkIconButton.module.css'

interface Props {
    link: 'calendar' | 'teams'
}

export const LinkIconButton = ({link}: Props) => {
    const to = link === 'calendar' ? routes.Home : routes.Teams
    return (
        <Link to={to} className={s.backbuttonLink}>
            <button className={s.backbutton}>
                {link === 'calendar' ? (<>&#128197;</>) : null}
                {link === 'teams' ? (<>&#127942;</>) : null}
            </button>
        </Link>
    );
}