import { useMatch } from "../../queries/calendar";
import { usePlayers } from "../../queries/players";
import { useTeams } from "../../queries/teams";
import { Link, useParams } from "react-router-dom"
import s from './Match.module.css'
import { MatchScore } from "../../components/match/score/MatchScore";
import { MatchFormations } from "../../components/match/formations/MatchFormations";

const Match = () => {
    const { id } = useParams();
    const m = useMatch(id || "")
    const p = usePlayers()
    const t = useTeams()
    const teams = t.data || []
    const players = p.data || {}

    return (
        <div className={s.outer}>
            <div className={s.container}>
                <div className={s.day}>Day {m.data?.day || '?'}</div>
                <div className={s.scoreContainer}>
                    {m.data ? <MatchScore match={m.data} teams={teams}/> : null}
                </div>
                <div className={s.formationsContainer}>
                    {m.data ? (
                        <MatchFormations match={m.data} players={players} /> 
                    ): null}
                </div>
                <Link to={`/`} className={s.backbuttonLink}>
                    <button className={s.backbutton}>View all matches</button>
                </Link>
            </div>
        </div>

    );
}

export default Match