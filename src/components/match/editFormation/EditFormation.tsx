import { Team } from "../../../types/teams"
import { Table } from "../../../components/generalUI/table/Table"
import { Player, PlayerMap } from "../../../types/players"
import { getNewFormationPlayerChange, getNewModuleOnChange, getRoster, getTeamFormation, updateModeMatchTeamFormation } from "../../../helpers"
import { Match, PreMatchFormation } from "../../../types/matches"
import s from './EditFormation.module.css'
import { useState } from "react"
import { useQueryClient } from "react-query"
import { EditFromationTable } from "./components/EditFromationTable/EditFromationTable"
import { EditFormationHeader } from "./components/EditFormationHeader/EditFormationHeader"
import { SortBenchOrder } from "./components/SortBenchOrder/SortBenchOrder"
import { useParams } from "react-router-dom"

interface Props {
    team: Team
    players: PlayerMap
    match: Match
    matchDayHasStarted: boolean
    onClose: () => void
}

export const EditFormation = ({team, players, match, matchDayHasStarted, onClose}: Props) => {
    const { league } = useParams()
    const queryClient = useQueryClient()
    const initFormation = getTeamFormation(match, players, team.id)
    const roster = getRoster(team, players)
    const [formation, setFormation] = useState<PreMatchFormation>(initFormation)
    const [module, setModule] = useState<string>(formation.m || '0-0-0')
    const [botMode, setBotMode] = useState<boolean>(team.auto_formation)
    const [benchOrderView, setBenchOrderView] = useState<boolean>(false)

    const handlePlayerClick = (player: Player) => () => {
        if (player.leaving) return
        const newFormation = getNewFormationPlayerChange(player, formation)
        const newModule = getNewModuleOnChange(newFormation)
        setFormation(newFormation)
        setModule(newModule)
    }

    const handleSaveformation = async() => {
        if (!botMode && !benchOrderView) {
            setBenchOrderView(true)
            return
        }
        const success = await updateModeMatchTeamFormation(match, team, formation, module, botMode, matchDayHasStarted)
        if (success) {
            queryClient.invalidateQueries(`teams-${league}`)
            queryClient.invalidateQueries(`match-${match.id}`)
            onClose();
        }
    }
    
    return (
        <div>
            {!benchOrderView ? (
                <Table 
                    minWidth={25}
                    header={
                        <EditFormationHeader 
                            botMode={botMode} 
                            setBotMode={setBotMode} 
                            module={module}
                            team={team}
                        />
                    }
                >
                    <EditFromationTable
                        roster={roster}
                        botMode={botMode}
                        formation={formation}
                        handlePlayerClick={handlePlayerClick}
                    />
                </Table>
            ) : (
                <SortBenchOrder formation={formation} setFormation={setFormation}/>
            )}
            <div className={s.savebuttoncontainer}>
                <button className={s.savebutton} onClick={handleSaveformation}>Save</button>
            </div>
        </div>
    )
}

