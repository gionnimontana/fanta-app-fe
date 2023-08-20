import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import s from './LinkIconButton.module.css'

type Link = 'calendar' | 'teams' | 'login' | 'edit' | 'market'

interface Props {
    links: Link[]
    onClick?: () => void
}

export const LinkIconButton = ({links, onClick}: Props) => {
    const destinationMap = {
        calendar: routes.Home,
        teams: routes.Teams,
        market: routes.Market,
        login: '#',
        edit: '#'
    }
    return (
        <div className={s.backbuttonLink}>
            {links.map((link, i) => {
                const to = destinationMap[link]
                return (
                <div className={s.singleWrapper} key={i}>
                    <Link to={to}>
                        <button className={s.backbutton} onClick={onClick}>
                            {link === 'calendar' ? (<>📆</>) : null}
                            {link === 'teams' ? (<>🏆</>) : null}
                            {link === 'login' ? (<>🔑</>) : null}
                            {link === 'edit' ? (<>🖊</>) : null}
                            {link === 'market' ? (<>🛒</>) : null}
                        </button>
                    </Link>
                </div>
                )
            })}
        </div>

    );
}