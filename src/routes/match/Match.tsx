import { useMatch } from "../../queries/calendar";
import { usePlayers } from "../../queries/players";
import { useTeams } from "../../queries/teams";
import { useParams } from "react-router-dom"
import { MatchScore } from "../../components/match/score/MatchScore";
import { MatchFormations } from "../../components/match/formations/MatchFormations";
import { AppScreen } from "../../components/generalUI/appScreen/AppScreen";
import { routes } from "../../constants/routes";
import { BottomButton } from "../../components/generalUI/bottomButton/BottonButton";
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
                    {m.data ? <MatchScore match={m.data} teams={teams} linked={true}/> : null}
                </div>
                <div className={s.formationsContainer}>
                    {m.data ? <MatchFormations match={m.data} players={players} /> : null}
                </div>
            </>
            <BottomButton label="View all matches" to={routes.Home}/>
        </AppScreen>
    );
}

export default Match