import { useState } from "react"
import { useTeams } from "../../queries/teams"
import { useCalendar } from "../../queries/calendar"
import { useArticle } from "../../queries/articles"
import { MatchCard } from "../../components/match/card/MatchCard"
import { Match } from "types/matches"
import { FullPageLoader } from "../../components/generalUI/fullPageLoader/FullPageLoader"
import { PageController } from "../../components/generalUI/pageController/PageController"
import { LinkIconButton } from "../../components/generalUI/linkIconButton/LinkIconButton"
import s from "./Home.module.css"
import { getCurrentMatchDay } from "../../helpers"
import { SwipeListener } from "../../components/generalUI/swipeListener/SwipeListener"
import { MatchArticle } from "../../components/match/article/MatchArticle"

export const Home = () => {
    const [day, setDay] = useState<number>(getCurrentMatchDay())
    const c = useCalendar(day)
    const a = useArticle('results', day)
    const t = useTeams()
    const isLoading = c.isLoading || t.isLoading
    const isError = c.isError || t.isError

    return (
        <div className={s.mainContainer}>
            <PageController page={day} setPage={setDay} tot={38}/>
            <SwipeListener 
                onSwipeLeft={() => setDay(day < 38 ? day + 1 : 38)} 
                onSwipeRight={() => setDay(day ? day - 1 : 0)}
                className={s.outerContainer}
            >
                <div className={s.container}>
                    {isLoading ? <FullPageLoader/> : null}
                    {isError ? <p>An error occourred while fetching matches</p> : null}
                    <div className={s.cardContainer}>
                        {c.data ? c.data.map((match: Match, i: number) => (
                            <MatchCard key={i} match={match} teams={t.data || []}/>
                        )) : null}
                    </div>
                    <MatchArticle day={day} article={a.data?.article}/>
                </div>
            </SwipeListener>
            <LinkIconButton link="teams"/>
        </div>
    )
}