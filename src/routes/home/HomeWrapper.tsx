import { useMatchDayTS } from "../../queries/calendar"
import { FullPageLoader } from "../../components/generalUI/fullPageLoader/FullPageLoader"
import { LinkIconButton } from "../../components/generalUI/linkIconButton/LinkIconButton"
import { getCurrentMatchDay } from "../../helpers"
import { Home } from "./components/Home"

export const HomeWrapper = () => {
    const c = useMatchDayTS()
    const currentDay = getCurrentMatchDay(c.data || [])
    const isLoading = c.isLoading 
    const isError = c.isError

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            {isLoading ? <FullPageLoader/> : <Home currentDay={currentDay} />}
            {isError ? <p>An error occourred while fetching schedules</p> : null}
            <LinkIconButton links={["market", "teams"]}/>
        </div>
    )
}