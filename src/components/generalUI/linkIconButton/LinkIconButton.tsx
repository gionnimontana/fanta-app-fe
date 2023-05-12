import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import s from './LinkIconButton.module.css'

interface Props {
    link: 'calendar' | 'teams' | 'login' | 'edit'
    onClick?: () => void
}

export const LinkIconButton = ({link, onClick}: Props) => {
    const to = link === 'calendar' ? routes.Home : routes.Teams
    return (
        <Link to={onClick ? '#' : to} className={s.backbuttonLink}>
            <button className={s.backbutton} onClick={onClick}>
                {link === 'calendar' ? (<>📆</>) : null}
                {link === 'teams' ? (<>🏆</>) : null}
                {link === 'login' ? (<>🔑</>) : null}
                {link === 'edit' ? (<>🖊</>) : null}
            </button>
        </Link>
    );
}