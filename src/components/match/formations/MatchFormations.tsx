import { Match } from "../../../types/matches";
import { PlayerMap } from "../../../types/players";
import { getMatchPlayerVotes } from "../../../helpers";
import s from './MatchFormations.module.css'
import { MatchFormation } from "./formation/MatchFormation";

interface Props {
    match: Match
    players: PlayerMap
}

export const MatchFormations = ({ match, players }: Props) => {
    const { home, away } = getMatchPlayerVotes(match, players)

    return (
            <div className={s.container}>
                <MatchFormation formation={home} />
                <MatchFormation formation={away} />
            </div>

    );
}