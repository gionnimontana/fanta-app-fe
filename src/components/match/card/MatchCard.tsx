import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import { Match } from "../../../types/matches"
import { Team } from "../../../types/teams"
import s from "./MatchCard.module.css"
import { MatchScore } from "../score/MatchScore"
import { MatchDayTS } from "types/utils"

interface Props {
    match: Match
    teams: Team[]
    mdTS: MatchDayTS[]
}

export const MatchCard = ({ match, teams, mdTS }: Props) => {
    return (
        <Link key={match.id} to={routes.Match.replace(':id', match.id)} className={s.link}>
            <div className={s.container}>
                <MatchScore match={match} teams={teams} mdTS={mdTS}/>
            </div>
        </Link>
    )
}
