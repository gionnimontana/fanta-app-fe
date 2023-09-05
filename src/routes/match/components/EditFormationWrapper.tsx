import { pb } from "../../../helpers/pb"
import { Modal } from "../../../components/generalUI/modal/Modal"
import { useTeam } from "../../../queries/teams"
import { useOpenPurchasePlayers } from "../../../queries/players"
import { EditFormation } from "../../../components/match/editFormation/EditFormation"
import { Match } from "../../../types/matches"
import { usePlayers } from "../../../queries/players"
import { addLeavingPlayers, getTeamPlayers } from "../../../helpers"

interface Props {
    onClose: () => void
    match: Match
    matchDayHasStarted: boolean
}

export const EditFormationWrapper = ({onClose, match, matchDayHasStarted}: Props) => {
    const teamId = pb.authStore.model?.team
    const t = useTeam(teamId)
    const p = usePlayers()
    const pc = useOpenPurchasePlayers()
    const tp = getTeamPlayers(teamId, p.data || {})
    const richPlayers = addLeavingPlayers(tp, pc.data)
    const loading = t.isLoading || p.isLoading || pc.isLoading
    
    return (
        <Modal onClose={onClose} loading={loading}>
            {t.data && p.data 
                ? <EditFormation 
                    team={t.data} 
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

