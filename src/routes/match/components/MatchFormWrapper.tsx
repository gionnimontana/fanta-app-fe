import { MatchFormations } from "../../../components/match/formations/MatchFormations";
import { Team } from "../../../types/teams";
import { Match } from "../../../types/matches";
import { usePlayers } from "../../../queries/players";

interface Props {
    match: Match
    teams: Team[]
}

export const MatchFormWrapper = ({match, teams}: Props) => {
    const p = usePlayers()

    if (!p.data) return null

    return (
        <MatchFormations match={match} players={p.data} teams={teams}/>
    );
}