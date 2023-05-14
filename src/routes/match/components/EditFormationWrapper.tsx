import { pb } from "../../../helpers/pb"
import { Modal } from "../../../components/generalUI/modal/Modal"
import { useTeam } from "../../../queries/teams"
import { useTeamPlayers } from "../../../queries/players"
import { EditFormation } from "../../../components/match/editFormation/EditFormation"
import { Match } from "../../../types/matches"

interface Props {
    onClose: () => void
    match: Match
}

export const EditFormationWrapper = ({onClose, match}: Props) => {
    const teamId = pb.authStore.model?.team
    const t = useTeam(teamId)
    const p = useTeamPlayers(teamId)
    const loading = t.isLoading || p.isLoading
    
    return (
        <Modal onClose={onClose} loading={loading}>
            {t.data && p.data 
                ? <EditFormation team={t.data} players={p.data} match={match}/> 
                : null
            }
        </Modal>
    )
}

