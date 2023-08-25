import { pb } from "../../../helpers/pb"
import { Modal } from "../../../components/generalUI/modal/Modal"
import { useTeam } from "../../../queries/teams"
import { useTeamPlayers } from "../../../queries/players"
import { EditFormation } from "../../../components/match/editFormation/EditFormation"
import { Match } from "../../../types/matches"

interface Props {
    onClose: () => void
    match: Match
    matchDayHasStarted: boolean
}

export const EditFormationWrapper = ({onClose, match, matchDayHasStarted}: Props) => {
    const teamId = pb.authStore.model?.team
    const t = useTeam(teamId)
    const p = useTeamPlayers(teamId)
    const loading = t.isLoading || p.isLoading
    
    return (
        <Modal onClose={onClose} loading={loading}>
            {t.data && p.data 
                ? <EditFormation 
                    team={t.data} 
                    players={p.data} 
                    match={match} 
                    matchDayHasStarted={matchDayHasStarted}
                    onClose={onClose}
                  /> 
                : null
            }
        </Modal>
    )
}

