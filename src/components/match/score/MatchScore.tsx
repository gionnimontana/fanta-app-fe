import { routes } from "../../../constants/routes"
import { Link, useParams } from "react-router-dom"
import { getMatchScore, getMatchTeams, isMatchDayIsInProgess, matchDayHasEnded } from "../../../helpers"
import { Match } from "../../../types/matches"
import { Team } from "../../../types/teams"
import s from "./MatchScore.module.css"
import { MatchDayTS } from "../../../types/utils"

interface Props {
    match: Match
    teams: Team[]
    linked?: boolean
    mdTS: MatchDayTS[]
}

export const MatchScore = ({ match, teams, linked, mdTS }: Props) => {
    const { league } = useParams()
    const { home, away } = getMatchTeams(match, teams)
    const matchInProgess = isMatchDayIsInProgess(match.day, mdTS)
    const matchEnded = matchDayHasEnded(match.day, mdTS)
    const score = getMatchScore(match, mdTS)
    const cNn = `${s.name} creativeFont`
    const cNs = matchInProgess ? s.scoreInProgress : s.scoreBasic
    const separator = matchEnded ? '-' : matchInProgess ? '⏳' : '📆'
    return (
        <div className={s.container}>
            {linked ? (
                <Link 
                    className={s.link} to={routes.Team.replace(':id', home?.id || '').replace(':league', league || '')}
                >
                    <p className={cNn}>{home?.name}</p>
                </Link>
            ) : <p className={cNn}>{home?.name}</p>}
            <p className={s.score}>
                {home?.emoji} 
                <span className={cNs}>{score.home}</span>
                {separator} 
                <span className={cNs}>{score.away}</span>
                {away?.emoji}
            </p>
            {linked ?(
                <Link 
                    className={s.link} to={routes.Team.replace(':id', away?.id || '').replace(':league', league || '')}
                >
                    <p className={cNn}>{away?.name}</p>
                </Link>
            ) : <p className={cNn}>{away?.name}</p>}
        </div>

    )
}
