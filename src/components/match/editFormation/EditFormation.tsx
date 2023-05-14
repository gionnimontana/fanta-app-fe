import { Team } from "../../../types/teams"
import { Table } from "../../../components/generalUI/table/Table"
import { PlayerMap } from "../../../types/players"
import { getRoster, getTeamFormation } from "../../../helpers"
import { Match } from "../../../types/matches"
import s from './EditFormation.module.css'
import { useState } from "react"

interface Props {
    team: Team
    players: PlayerMap
    match: Match
}

export const EditFormation = ({team, players, match}: Props) => {
    const formation = getTeamFormation(match, players, team.id)
    const roster = getRoster(team, players)
    const [module, setModule] = useState<string>(formation.m || '0-0-0')
    
    return (
        <div>
            <Table 
                minWidth={25}
                header={
                    <div className={s.header}>
                        <p className={s.emoji}>{team.emoji}</p>
                        <div className={s.headerText}>
                            {module}
                        </div>
                        <p className={s.emoji}>{team.emoji}</p>
                    </div>
                }
            >
                <div className={s.player}>
                    <p className={s.role}></p>
                    <p className={`${s.name} ${s.bold}`}>NAME</p>
                    <p className={`${s.name} ${s.bold}`}>FROM</p>
                    <p className={`${s.value} ${s.bold}`}>FVM</p>
                    <p className={`${s.value} ${s.bold}`}>PNM</p>
                </div>
                <div className={s.players}>
                    {roster.map((player, i) => {
                        return (
                            <div className={s.player} key={i}>
                                <p className={s.role}>{player.role}</p>
                                <p className={s.name}>{player.name}</p>
                                <p className={s.name}>{player.team}</p>
                                <p className={s.value}>{player.fvm}</p>
                                <p className={s.value}>{player.play_next_match}</p>
                            </div>
                        )
                    })}
                </div>
            </Table>
            starters
            {formation.s.map(el => el.name)}
            benchers
            {formation.s.map(el => el.name)}
        </div>
    )
}

