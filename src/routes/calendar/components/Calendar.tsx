import { useTeams } from "../../../queries/teams"
import { useCalendar, useMatchDayTS } from "../../../queries/calendar"
import { useArticle } from "../../../queries/articles"
import { MatchCard } from "../../../components/match/card/MatchCard"
import { Match } from "types/matches"
import { FullPageLoader } from "../../../components/generalUI/fullPageLoader/FullPageLoader"
import { PageController } from "../../../components/generalUI/pageController/PageController"
import { SwipeListener } from "../../../components/generalUI/swipeListener/SwipeListener"
import { MatchArticle } from "../../../components/match/article/MatchArticle"
import { useNavigate, useParams } from "react-router-dom"
import { routes } from "../../../constants/routes"
import s from "./Calendar.module.css"

interface Props {
    currentDay: number
}

export const Calendar = ({currentDay}: Props) => {
    const { league } = useParams()
    const navigate = useNavigate()
    const c = useCalendar(league, currentDay)
    const a = useArticle(league, 'results', currentDay)
    const t = useTeams(league)
    const mdTs = useMatchDayTS()
    const isLoading = c.isLoading || t.isLoading || mdTs.isLoading
    const isError = c.isError || t.isError
    const isData = c.data && mdTs.data

    const setDay = (day: number) => navigate(routes.Calendar.replace(':id', day.toString()).replace(':league', league || ''))

    return (
        <>
            <PageController page={currentDay} setPage={setDay} tot={38}/>
            <SwipeListener 
                onSwipeLeft={() => setDay(currentDay < 38 ? currentDay + 1 : 38)} 
                onSwipeRight={() => setDay(currentDay > 1 ? currentDay - 1 : 1)}
                className={s.outerContainer}
            >
                <div className={s.container}>
                    {isLoading ? <FullPageLoader/> : null}
                    {isError ? <p>An error occourred while fetching matches</p> : null}
                    <div className={s.cardContainer}>
                        {isData ? c.data.map((match: Match, i: number) => (
                            <MatchCard key={i} match={match} teams={t.data || []} mdTS={mdTs.data}/>
                        )) : null}
                    </div>
                    <MatchArticle day={currentDay} article={a.data}/>
                </div>
            </SwipeListener>
        </>
    )
}