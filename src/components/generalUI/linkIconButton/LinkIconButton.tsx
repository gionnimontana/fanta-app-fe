import { routes } from "../../../constants/routes"
import { Link, useNavigate } from "react-router-dom"
import { pb } from "../../../helpers/pb"
import { useParams } from "react-router-dom"
import s from './LinkIconButton.module.css'

export type LinkType = 'calendar' | 'teams' | 'login' | 'edit' | 'market' | 'logout'

interface Props {
    links: LinkType[]
    onClick?: () => void
}

export const LinkIconButton = ({links, onClick}: Props) => {
    const { league } = useParams();
    const navigate = useNavigate()
    
    const destinationMap = {
        calendar: routes.Calendar.replace(':id', '').replace(':league', league || ''),
        teams: routes.Teams.replace(':league', league || ''),
        market: routes.Market.replace(':league', league || ''),
        login: '#',
        edit: '#',
        logout: '#'
    }
    const clickMap = {
        calendar: undefined,
        teams: undefined,
        market: undefined,
        login: onClick,
        edit: onClick,
        logout: () => { 
            pb.authStore.clear()
            navigate(0)
        }
    }
    return (
        <div className={s.backbuttonLink}>
            {links.map((link, i) => {
                const to = destinationMap[link]
                const click = clickMap[link]
                return (
                <div className={s.singleWrapper} key={i}>
                    <Link to={to}>
                        <button className={s.backbutton} onClick={click}>
                            {link === 'calendar' ? (<>📆</>) : null}
                            {link === 'teams' ? (<>🏆</>) : null}
                            {link === 'login' ? (<>🔑</>) : null}
                            {link === 'edit' ? (<>🖊</>) : null}
                            {link === 'market' ? (<>🛒</>) : null}
                            {link === 'logout' ? (<>🚪</>) : null}
                        </button>
                    </Link>
                </div>
                )
            })}
        </div>

    );
}