import { useMatch } from "../../queries/calendar";
import { usePlayers } from "../../queries/players";
import { useTeams } from "../../queries/teams";
import { Link, useParams } from "react-router-dom"
import { MatchScore } from "../../components/match/score/MatchScore";
import { MatchFormations } from "../../components/match/formations/MatchFormations";
import { AppScreen } from "../../components/generalUI/appScreen/AppScreen";
import s from './Match.module.css'

const Match = () => {
    const { id } = useParams();
    const m = useMatch(id || "")
    const p = usePlayers()
    const t = useTeams()
    const teams = t.data || []
    const players = p.data || {}
    const loading = m.isLoading || p.isLoading || t.isLoading

    return (
        <AppScreen loading={loading}>
            <>
                <div className={s.day}>Day {m.data?.day || '?'}</div>
                <div className={s.scoreContainer}>
                    {m.data ? <MatchScore match={m.data} teams={teams}/> : null}
                </div>
                <div className={s.formationsContainer}>
                    {m.data ? (
                        <MatchFormations match={m.data} players={players} /> 
                    ): null}
                </div>
            </>
            <Link to={`/`} className={s.backbuttonLink}>
                <button className={s.backbutton}>View all matches</button>
            </Link>
        </AppScreen>
    );
}

export default Match