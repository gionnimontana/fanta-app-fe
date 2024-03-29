import { routes } from "../../../constants/routes"
import { Link, useParams } from "react-router-dom"
import { Team } from "../../../types/teams"
import { getRankEmoji } from "../../../helpers"
import s from "./TeamCard.module.css"

interface Props {
    team: Team
    rank?: number
}

export const TeamCard = ({ team, rank }: Props) => {
    const { league } = useParams()
    const cN = `${s.name} creativeFont`
    return (
        <Link key={team.id} to={routes.Team.replace(':id', team.id).replace(':league', league || '')} className={s.link}>
            <div className={s.container}>
                <div className={s.card}>
                    {rank !== undefined ? 
                        <p className={s.rank}>{getRankEmoji(rank)} {team.emoji}</p> 
                    : null}
                    <p className={cN}>{team.name}</p>
                    <p className={s.points}>{team.score?.pts}</p>
                    <p className={s.value}>{team.score?.vs}</p>
                    <p className={s.value}>{team.score?.mp}</p>
                    <p className={s.value}>{team.score?.w}</p>
                    <p className={s.value}>{team.score?.d}</p>
                    <p className={s.value}>{team.score?.l}</p>
                    <p className={s.value}>{team.credits}</p>
                </div>
            </div>
        </Link>
    )
}
