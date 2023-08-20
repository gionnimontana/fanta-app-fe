import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import { getMatchScore, getMatchTeams } from "../../../helpers"
import { Match } from "../../../types/matches"
import { Team } from "../../../types/teams"
import s from "./MatchScore.module.css"
import { useMatchDayTS } from "queries/calendar"
import { MatchDayTS } from "types/utils"

interface Props {
    match: Match
    teams: Team[]
    linked?: boolean
    mdTS: MatchDayTS[]
}

export const MatchScore = ({ match, teams, linked, mdTS }: Props) => {
    const { home, away } = getMatchTeams(match, teams)
    const score = getMatchScore(match, mdTS)
    const cN = `${s.name} creativeFont`
    return (
        <div className={s.container}>
            {linked ? <Link to={routes.Team.replace(':id', home?.id || '')}>
                <p className={cN}>{home?.name}</p>
            </Link> : <p className={cN}>{home?.name}</p>}
            <p className={s.score}>{home?.emoji} {score.home} - {score.away} {away?.emoji}</p>
            {linked ? <Link to={routes.Team.replace(':id', away?.id || '')}>
                <p className={cN}>{away?.name}</p>
            </Link>: <p className={cN}>{away?.name}</p>}
        </div>

    )
}
