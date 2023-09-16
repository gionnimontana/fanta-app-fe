import { pb } from "../../../helpers/pb"
import { Modal } from "../../../components/generalUI/modal/Modal"
import { useOpenPurchasePlayers } from "../../../queries/players"
import { EditFormation } from "../../../components/match/editFormation/EditFormation"
import { Match } from "../../../types/matches"
import { usePlayers } from "../../../queries/players"
import { addLeavingPlayers, getAuthUserTeamId, getTeamPlayers } from "../../../helpers"
import { Team } from "../../../types/teams"
import { useParams } from "react-router-dom"

interface Props {
    onClose: () => void
    match: Match
    matchDayHasStarted: boolean
    team: Team | undefined
}

export const EditFormationWrapper = ({onClose, match, matchDayHasStarted, team}: Props) => {
    const { league } = useParams()
    const teamId = getAuthUserTeamId(league)
    const p = usePlayers(league)
    const pc = useOpenPurchasePlayers(league)
    const tp = getTeamPlayers(teamId, p.data || {})
    const richPlayers = addLeavingPlayers(tp, pc.data)
    const loading = p.isLoading || pc.isLoading
    
    return (
        <Modal onClose={onClose} loading={loading}>
            {team && p.data 
                ? <EditFormation 
                    team={team} 
                    players={richPlayers} 
                    match={match} 
                    matchDayHasStarted={matchDayHasStarted}
                    onClose={onClose}
                  /> 
                : null
            }
        </Modal>
    )
}

