import { getMatchScore, getMatchTeams, getMatchTeamsId } from "../../../helpers"
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
            <p className={s.name}>{home?.name}</p>
            <p className={s.score}>{score.home} - {score.away}</p>
            <p className={s.name}>{away?.name}</p>
        </div>

    )
}
