import { MatchFormations } from "../../../components/match/formations/MatchFormations";
import { Team } from "../../../types/teams";
import { Match } from "../../../types/matches";
import { useMatchPlayers } from "../../../queries/players";

interface Props {
    match: Match
    teams: Team[]
}

export const MatchFormWrapper = ({match, teams}: Props) => {
    const mp = useMatchPlayers(match)

    if (!mp.data) return null

    return (
        <MatchFormations match={match} players={mp.data} teams={teams}/>
    );
}