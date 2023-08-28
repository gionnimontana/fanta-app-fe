import { useCalendar, useMatch, useMatchDayTS } from "../../queries/calendar";
import { useTeams } from "../../queries/teams";
import { useNavigate, useParams } from "react-router-dom"
import { MatchScore } from "../../components/match/score/MatchScore";
import { AppScreen } from "../../components/generalUI/appScreen/AppScreen";
import { routes } from "../../constants/routes";
import { BottomButton } from "../../components/generalUI/bottomButton/BottonButton";
import { MatchFormWrapper } from "./components/MatchFormWrapper";
import { EditFormButton } from "./components/EditFormButton";
import { getPreviousAndNextMatchNavigator } from "../../helpers";
import { ArrowSwiperListener } from "../../components/generalUI/swipeListener/ArrowSwiperListener";
import s from './Match.module.css'

export const Match = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const m = useMatch(id || "")
    const matchDay = m.data?.day || undefined
    const c = useCalendar(matchDay)
    const t = useTeams()
    const mdTS = useMatchDayTS()
    const teams = t.data || []
    const loading = m.isLoading || t.isLoading
    const isData = m.data && mdTS.data
    const matchNavigator = getPreviousAndNextMatchNavigator(m.data || undefined, c.data || [], navigate)

    return (
        <AppScreen loading={loading}>
            <ArrowSwiperListener 
                onSwipeLeft={matchNavigator.next}
                onSwipeRight={matchNavigator.previous}
                className={s.swipeContainer}
            >
                <div className={s.day}>Day {m.data?.day || '?'}</div>
                <div className={s.scoreContainer}>
                    {isData ? <MatchScore match={m.data} teams={teams} linked={true} mdTS={mdTS.data}/> : null}
                </div>
                <div className={s.formationsContainer}>
                    {m.data ? <MatchFormWrapper match={m.data} teams={teams}/> : null}
                </div>
            </ArrowSwiperListener>
            <BottomButton label={`View day ${matchDay} matches`} to={routes.Home.replace(':id', `${matchDay}`)}/>
            {(m.data && mdTS.data) ? <EditFormButton match={m.data} matchDayTS={mdTS.data} /> : null}
        </AppScreen>
    );
}