import { MatchFormations } from "../../../components/match/formations/MatchFormations";
import { Team } from "../../../types/teams";
import { Match } from "../../../types/matches";
import { usePlayers } from "../../../queries/players";
import { useParams } from "react-router-dom";

interface Props {
    match: Match
    teams: Team[]
}

export const MatchFormWrapper = ({match, teams}: Props) => {
    const { league } = useParams()
    const p = usePlayers(league)

    if (!p.data) return null

    return (
        <MatchFormations match={match} players={p.data} teams={teams}/>
    );
}