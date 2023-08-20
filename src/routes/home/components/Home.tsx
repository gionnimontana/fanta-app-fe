import { useState } from "react"
import { useTeams } from "../../../queries/teams"
import { useCalendar, useMatchDayTS } from "../../../queries/calendar"
import { useArticle } from "../../../queries/articles"
import { MatchCard } from "../../../components/match/card/MatchCard"
import { Match } from "types/matches"
import { FullPageLoader } from "../../../components/generalUI/fullPageLoader/FullPageLoader"
import { PageController } from "../../../components/generalUI/pageController/PageController"
import { SwipeListener } from "../../../components/generalUI/swipeListener/SwipeListener"
import { MatchArticle } from "../../../components/match/article/MatchArticle"
import s from "./Home.module.css"

interface Props {
    currentDay: number
}

export const Home = ({currentDay}: Props) => {
    const [day, setDay] = useState<number>(currentDay)
    const c = useCalendar(day)
    const a = useArticle('results', day)
    const t = useTeams()
    const mdTs = useMatchDayTS()
    const isLoading = c.isLoading || t.isLoading || mdTs.isLoading
    const isError = c.isError || t.isError
    const isData = c.data && mdTs.data

    return (
        <>
            <PageController page={day} setPage={setDay} tot={38}/>
            <SwipeListener 
                onSwipeLeft={() => setDay(day < 38 ? day + 1 : 38)} 
                onSwipeRight={() => setDay(day > 1 ? day - 1 : 1)}
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
                    <MatchArticle day={day} article={a.data}/>
                </div>
            </SwipeListener>
        </>
    )
}