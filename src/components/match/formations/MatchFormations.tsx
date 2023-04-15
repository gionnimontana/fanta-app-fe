import { Match } from "../../../types/matches";
import { PlayerMap } from "../../../types/players";
import s from './MatchFormations.module.css'
import { MatchFormation } from "./formation/MatchFormation";
import { getMatchPlayerVotes } from "../../../helpers";

interface Props {
    match: Match
    players: PlayerMap
}

export const MatchFormations = ({ match, players }: Props) => {
    const { home, away } = getMatchPlayerVotes(match, players)

    return (
            <div className={s.container}>
                <MatchFormation formation={home} />
                <div className={s.away}>
                    <MatchFormation formation={away} />
                </div>
            </div>

    );
}