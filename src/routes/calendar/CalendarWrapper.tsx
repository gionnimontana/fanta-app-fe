import { useMatchDayTS } from "../../queries/calendar"
import { FullPageLoader } from "../../components/generalUI/fullPageLoader/FullPageLoader"
import { LinkIconButton } from "../../components/generalUI/linkIconButton/LinkIconButton"
import { getCurrentMatchDay } from "../../helpers"
import { Calendar } from "./components/Calendar"
import { useParams } from "react-router-dom"

export const CalendarWrapper = () => {
    const { id } = useParams();
    const c = useMatchDayTS()
    const currentDay = id ? Number(id) : getCurrentMatchDay(c.data || [])
    const isLoading = c.isLoading 
    const isError = c.isError

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            {isLoading ? <FullPageLoader/> : <Calendar currentDay={currentDay} />}
            {isError ? <p>An error occourred while fetching schedules</p> : null}
            <LinkIconButton links={["quitLeague", "market", "teams"]}/>
        </div>
    )
}