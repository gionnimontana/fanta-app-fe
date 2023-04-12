import { routes } from "../../../constants/routes"
import { Link } from "react-router-dom"
import { Team } from "../../../types/teams"
import s from "./TeamCard.module.css"

interface Props {
    team: Team
    rank?: number
}

export const TeamCard = ({ team, rank }: Props) => {
    return (
        <Link key={team.id} to={routes.Team.replace(':id', team.id)} className={s.link}>
            <div className={s.container}>
                <div className={s.card}>
                    {rank !== undefined ? 
                        <p className={s.rank}>#{rank + 1} {team.emoji}</p> 
                    : null}
                    <p className={s.name}>{team.name}</p>
                    <p className={s.value}>{team.credits}</p>
                    <p className={s.value}>{team.score?.mp}</p>
                    <p className={s.value}>{team.score?.w}</p>
                    <p className={s.value}>{team.score?.d}</p>
                    <p className={s.value}>{team.score?.l}</p>
                    <p className={s.value}>{team.score?.pts}</p>
                </div>
            </div>
        </Link>
    )
}
