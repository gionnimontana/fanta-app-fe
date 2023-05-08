import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import s from './LinkIconButton.module.css'

interface Props {
    link: 'calendar' | 'teams' | 'auth' | 'edit'
}

export const LinkIconButton = ({link}: Props) => {
    const to = link === 'calendar' ? routes.Home : routes.Teams
    return (
        <Link to={to} className={s.backbuttonLink}>
            <button className={s.backbutton}>
                {link === 'calendar' ? (<>📆</>) : null}
                {link === 'teams' ? (<>🏆</>) : null}
                {link === 'auth' ? (<>🔑</>) : null}
                {link === 'edit' ? (<>🖊</>) : null}
            </button>
        </Link>
    );
}