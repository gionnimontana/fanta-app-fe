import { Team } from "../../../types/teams"
import { Table } from "../../../components/generalUI/table/Table"
import { Player, PlayerMap } from "../../../types/players"
import { getNewFormationPlayerChange, getNewModuleOnChange, getPlayerFormationIcon, getRoster, getTeamFormation, updateModeMatchTeamFormation } from "../../../helpers"
import { Match, PreMatchFormation } from "../../../types/matches"
import s from './EditFormation.module.css'
import { useState } from "react"
import { validModules } from "../../../constants/settings"
import { useQueryClient } from "react-query"

interface Props {
    team: Team
    players: PlayerMap
    match: Match
}

export const EditFormation = ({team, players, match}: Props) => {
    const queryClient = useQueryClient()
    const initFormation = getTeamFormation(match, players, team.id)
    const roster = getRoster(team, players)
    const [formation, setFormation] = useState<PreMatchFormation>(initFormation)
    const [module, setModule] = useState<string>(formation.m || '0-0-0')
    const [botMode, setBotMode] = useState<boolean>(team.auto_formation)

    const handlePlayerClick = (player: Player) => () => {
        const newFormation = getNewFormationPlayerChange(player, formation)
        const newModule = getNewModuleOnChange(newFormation)
        setFormation(newFormation)
        setModule(newModule)
    }

    const handleSaveformation = async() => {
        const success = await updateModeMatchTeamFormation(match, team, formation, module, botMode)
        if (success) {
            queryClient.invalidateQueries(`team-${team.id}`)
            queryClient.invalidateQueries(`match-${match.id}`)
        }
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
                        const isStarter = icon === '🏁'
                        return (
                            <div className={`${isStarter ? s.starter : ''} ${s.player}`} key={i}>
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
                <button className={s.savebutton} onClick={handleSaveformation}>Save</button>
            </div>
        </div>
    )
}

