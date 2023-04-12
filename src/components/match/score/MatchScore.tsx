import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import { getMatchScore, getMatchTeams } from "../../../helpers"
import { Match } from "../../../types/matches"
import { Team } from "../../../types/teams"
import s from "./MatchScore.module.css"

interface Props {
    match: Match
    teams: Team[]
    linked?: boolean
}

export const MatchScore = ({ match, teams, linked }: Props) => {
    const { home, away } = getMatchTeams(match, teams)
    const score = getMatchScore(match)
    return (
        <div className={s.container}>
            {linked ? <Link to={routes.Team.replace(':id', home?.id || '')}>
                <p className={s.name}>{home?.name}</p>
            </Link> : <p className={s.name}>{home?.name}</p>}
            <p className={s.score}>{home?.emoji} {score.home} - {score.away} {away?.emoji}</p>
            {linked ? <Link to={routes.Team.replace(':id', away?.id || '')}>
                <p className={s.name}>{away?.name}</p>
            </Link>: <p className={s.name}>{away?.name}</p>}
        </div>

    )
}
