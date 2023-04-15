import { Match } from "../../../../types/matches";
import { PlayerMap } from "../../../../types/players";
import { MatchFormation } from "./../formation/MatchFormation";
import { getPreMatchFormations, getMatchIcons } from "../../../../helpers";
import s from './PreMatchFormations.module.css'

interface Props {
    match: Match
    players: PlayerMap
}

export const PreMatchFormations = ({ match, players }: Props) => {
    const { home, away } = getPreMatchFormations(match, players)
    const icon = getMatchIcons(match)

    return (
            <div className={s.container}>
                <div className={s.form}>
                    <div>{icon.home} {home.m} 🏁</div>
                    <MatchFormation formation={home.s} />
                    <div className={s.marginTop}>{icon.home} 🍺</div>
                    <MatchFormation formation={home.b} />
                </div>
                <div className={s.form}>
                    <div>{icon.home} {away.m} 🏁</div>
                    <MatchFormation formation={away.s} />
                    <div className={s.marginTop}>{icon.away} 🍺</div>
                    <MatchFormation formation={away.b} />
                </div>
            </div>

    );
}