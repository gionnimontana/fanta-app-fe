import { useState } from "react"
import { useTeams } from "../../queries/teams"
import { useCalendar } from "../../queries/calendar"
import { MatchCard } from "../../components/matchCard/MatchCard"
import { Match } from "types/matches"
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader"
import { PageController } from "../../components/pageController/PageController"
import s from "./Home.module.css"

const Home = () => {
    const [day, setDay] = useState<number>(28)
    const c = useCalendar(day)
    const t = useTeams()
    const isLoading = c.isLoading || t.isLoading
    const isError = c.isError || t.isError

    return (
        <div className={s.mainContainer}>
            <PageController page={day} setPage={setDay} tot={38}/>
            <div className={s.outerContainer}>
                <div className={s.container}>
                    {isLoading ? <FullPageLoader/> : null}
                    {isError ? <p>An error occourred while fetching characters</p> : null}
                    {c.data ? c.data.map((match: Match, i: number) => (
                        <MatchCard key={i} match={match} teams={t.data || []}/>
                    )) : null}
                </div>
            </div>
        </div>
    )
}

export default Home