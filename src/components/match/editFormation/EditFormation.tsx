import { Team } from "../../../types/teams"
import { Table } from "../../../components/generalUI/table/Table"
import { Player, PlayerMap } from "../../../types/players"
import { getNewFormationPlayerChange, getNewModuleOnChange, getPlayerFormationIcon, getRoster, getTeamFormation } from "../../../helpers"
import { Match, PreMatchFormation } from "../../../types/matches"
import s from './EditFormation.module.css'
import { useState } from "react"

interface Props {
    team: Team
    players: PlayerMap
    match: Match
}

export const EditFormation = ({team, players, match}: Props) => {
    const initFormation = getTeamFormation(match, players, team.id)
    const roster = getRoster(team, players)
    const [formation, setFormation] = useState<PreMatchFormation>(initFormation)
    const [module, setModule] = useState<string>(formation.m || '0-0-0')
    const [botMode, setBotMode] = useState<boolean>(false)

    const handlePlayerClick = (player: Player) => () => {
        const newFormation = getNewFormationPlayerChange(player, formation)
        const newModule = getNewModuleOnChange(newFormation)
        setFormation(newFormation)
        setModule(newModule)
    }
    
    return (
        <div>
            <Table 
                minWidth={25}
                header={
                    <div 
                        className={s.header}
                        onClick={() => setBotMode(!botMode)}
                    >
                        <p className={s.emoji}>{team.emoji}</p>
                        <button 
                            className={s.headerText}
                            onClick={() => setBotMode(!botMode)}
                        >
                            {botMode 
                                ? 'BotMode'
                                : module
                            }
                        </button>
                        <p className={s.emoji}>{team.emoji}</p>
                    </div>
                }
            >
                <div className={s.player}>
                    <p className={s.positionH}></p>
                    <p className={s.role}></p>
                    <p className={`${s.name} ${s.bold}`}>NAME</p>
                    <p className={`${s.name} ${s.bold}`}>FROM</p>
                    <p className={`${s.value} ${s.bold}`}>FVM</p>
                    <p className={`${s.value} ${s.bold}`}>PNM</p>
                </div>
                <div className={s.players}>
                    {roster.map((player, i) => {
                        const icon = botMode 
                            ? '🤖'
                            : getPlayerFormationIcon(player.id, formation)
                        return (
                            <div className={s.player} key={i}>
                                <div 
                                    className={s.position}
                                    onClick={handlePlayerClick(player)}
                                >
                                    {icon}
                                </div>
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
            <div className={s.savebuttoncontainer}>
                <button className={s.savebutton}>Save</button>
            </div>
        </div>
    )
}

