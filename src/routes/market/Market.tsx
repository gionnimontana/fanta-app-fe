import { AppScreen } from "../../components/generalUI/appScreen/AppScreen"
import { usePlayers } from "../../queries/players"
import { useTeams } from "../../queries/teams"
import { PlayerTableWrapper } from "./components/PlayerTableWrapper"
import s from './Market.module.css'

export const Market = () => {
  const ap = usePlayers()
  const t = useTeams()
  const isLoading = ap.isLoading || t.isLoading
  return (
    <AppScreen loading={isLoading}>
      <h2 className={s.title}>🛒 Market 🛒</h2>
      {ap.data && t.data 
          ? <PlayerTableWrapper players={ap.data} teams={t.data}/>
          : <div>Something went wrong (no teams or player data)</div>
      }
    </AppScreen>
  )
}