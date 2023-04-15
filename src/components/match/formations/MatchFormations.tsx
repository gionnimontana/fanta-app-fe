import { Match } from "../../../types/matches";
import { PlayerMap } from "../../../types/players";
import s from './MatchFormations.module.css'
import { MatchFormation } from "./formation/MatchFormation";
import { getMatchPlayerVotes } from "../../../helpers";
import { PreMatchFormations } from "./preMatch/PreMatchFormations";

interface Props {
    match: Match
    players: PlayerMap
}

export const MatchFormations = ({ match, players }: Props) => {
    const { home, away } = getMatchPlayerVotes(match, players)
    const scoreExists = Boolean(match.result)

    return (
            <div className={s.container}>
                {scoreExists ? (<>
                    <MatchFormation formation={home} />
                    <div className={s.away}>
                        <MatchFormation formation={away} />
                    </div>
                </>): (
                    <PreMatchFormations match={match} players={players}/>
                )}
            </div>

    );
}