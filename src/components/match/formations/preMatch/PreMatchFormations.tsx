import { Match } from "../../../../types/matches";
import { PlayerMap } from "../../../../types/players";
import { MatchFormation } from "./../formation/MatchFormation";
import { getPreMatchFormations } from "../../../../helpers";
import s from './PreMatchFormations.module.css'

interface Props {
    match: Match
    players: PlayerMap
}

export const PreMatchFormations = ({ match, players }: Props) => {
    const { home, away } = getPreMatchFormations(match, players)

    return (
            <>
                <MatchFormation formation={home.s} />
                <MatchFormation formation={home.b} />
                <div className={s.away}>
                    <MatchFormation formation={away.s} />
                    <MatchFormation formation={away.b} />
                </div>
            </>

    );
}