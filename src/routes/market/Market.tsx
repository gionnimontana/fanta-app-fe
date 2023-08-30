import { LinkIconButton } from "../../components/generalUI/linkIconButton/LinkIconButton"
import { AppScreen } from "../../components/generalUI/appScreen/AppScreen"
import { useOpenPurchasePlayers, usePlayers, usePurchasesSubscription } from "../../queries/players"
import { useTeams } from "../../queries/teams"
import { PlayerTableWrapper } from "../../components/players/PlayerTable/PlayerTableWrapper"
import s from './Market.module.css'

export const Market = () => {
  usePurchasesSubscription()
  const ap = usePlayers()
  const t = useTeams()
  const op = useOpenPurchasePlayers()
  const isLoading = ap.isLoading || t.isLoading || op.isLoading
  return (
    <AppScreen loading={isLoading}>
      <h2 className={s.title}>🛒 Market 🛒</h2>
      {ap.data && t.data  && op.data
          ? <PlayerTableWrapper players={ap.data} teams={t.data} activePurchases={op.data}/>
          : <div>Something went wrong (no teams or player data)</div>
      }
      <LinkIconButton links={["calendar", "teams"]}/>
    </AppScreen>
  )
}