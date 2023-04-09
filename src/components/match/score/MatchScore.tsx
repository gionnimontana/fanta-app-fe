import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import { getMatchScore, getMatchTeams } from "../../../helpers"
import { Match } from "../../../types/matches"
import { Team } from "../../../types/teams"
import s from "./MatchScore.module.css"

interface Props {
    match: Match
    teams: Team[]
}

export const MatchScore = ({ match, teams }: Props) => {
    const { home, away } = getMatchTeams(match, teams)
    const score = getMatchScore(match)
    return (
        <div className={s.container}>
            <Link to={routes.Team.replace(':id', home?.id || '')}>
                <p className={s.name}>{home?.name}</p>
            </Link>
            <p className={s.score}>{score.home} - {score.away}</p>
            <Link to={routes.Team.replace(':id', away?.id || '')}>
                <p className={s.name}>{away?.name}</p>
            </Link>
        </div>

    )
}
