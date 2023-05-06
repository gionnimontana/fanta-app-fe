import { useMatch } from "../../queries/calendar";
import { useTeams } from "../../queries/teams";
import { useParams } from "react-router-dom"
import { MatchScore } from "../../components/match/score/MatchScore";
import { AppScreen } from "../../components/generalUI/appScreen/AppScreen";
import { routes } from "../../constants/routes";
import { BottomButton } from "../../components/generalUI/bottomButton/BottonButton";
import s from './Match.module.css'
import { MatchFormWrapper } from "./components/MatchFormWrapper";

export const Match = () => {
    const { id } = useParams();
    const m = useMatch(id || "")
    const t = useTeams()
    const teams = t.data || []
    const loading = m.isLoading || t.isLoading

    return (
        <AppScreen loading={loading}>
            <div className={s.day}>Day {m.data?.day || '?'}</div>
            <div className={s.scoreContainer}>
                {m.data ? <MatchScore match={m.data} teams={teams} linked={true}/> : null}
            </div>
            <div className={s.formationsContainer}>
                {m.data ? <MatchFormWrapper match={m.data} teams={teams}/> : null}
            </div>
            <BottomButton label="View all matches" to={routes.Home}/>
        </AppScreen>
    );
}