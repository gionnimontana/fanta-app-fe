import { routes } from "../../constants/routes"
import { Link } from "react-router-dom"
import { Match } from "../../types/matches"
import { Team } from "../../types/teams"
import s from "./MatchCard.module.css"

interface Props {
    match: Match
    teams: Team[]
}

export const MatchCard = ({ match, teams }: Props) => {
    const homeTeamId = match.match.split('-')[0]
    const awayTeamId = match.match.split('-')[1]
    const homeTeam = teams.find(team => team.id === homeTeamId)
    const awayTeam = teams.find(team => team.id === awayTeamId)
    const score = match?.result ? JSON.parse(match.result)?.score : null
    return (
        <Link key={match.id} to={routes.Match.replace(':id', match.id)} className={s.link}>
            <div className={s.container}>
                <p className={s.name}>{homeTeam?.name}</p>
                <p className={s.name}>VS</p>
                <p className={s.name}>{awayTeam?.name}</p>
                {score && <p className={s.score}>{score.home} - {score.away}</p>}
            </div>
        </Link>
    )
}
