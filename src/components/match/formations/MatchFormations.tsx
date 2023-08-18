import { Match } from "../../../types/matches";
import { PlayerMap } from "../../../types/players";
import { MatchFormation } from "./formation/MatchFormation";
import { getMatchFormations, getMatchIcons, getMatchPoints } from "../../../helpers";
import s from './MatchFormations.module.css'
import { Team } from "../../../types/teams";

interface Props {
    match: Match
    players: PlayerMap
    teams: Team[]
}

export const MatchFormations = ({ match, players, teams }: Props) => {
    const { home, away } = getMatchFormations(match, players)
    const p = getMatchPoints(match, players)
    const icon = getMatchIcons(match, teams)

    return (
            <div className={s.container}>
                <div className={s.form}>
                    {p.home ? <div className={s.tot}>{p.home}</div> : null}
                    <div className={s.center}>{icon.home} {home.m} 🏁</div>
                    <MatchFormation formation={home.s} />
                    <div className={s.marginTop}>{icon.home} 👀</div>
                    <MatchFormation formation={home.b} />
                </div>
                <div className={s.form}>
                    {p.away ? <div className={s.tot}>{p.away}</div> : null}
                    <div className={s.center}>{icon.away} {away.m} 🏁</div>
                    <MatchFormation formation={away.s} />
                    <div className={s.marginTop}>{icon.away} 👀</div>
                    <MatchFormation formation={away.b} />
                </div>
            </div>
    );
}