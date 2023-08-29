import { PlayerMap, Purchase } from "../../../types/players"
import s from './TeamMarketHeader.module.css'
import { Team } from "../../../types/teams"
import { useTeamPlayers } from "../../../queries/players"
import { getCurrentPlayerByRole, getMaxPlayerByRole, getMaxPurchaseByRole } from "../../../helpers"

interface Props {
    team: Team
    budget: number
    purchases: Purchase[]
    role: string
    players: PlayerMap
}

export const TeamMarketHeader = ({team, budget, purchases, role, players}: Props) => {
    const inPurchase = purchases.filter(p => p.to_team === team.id).length
    const outPurchase = purchases.filter(p => p.from_team === team.id && p.validated)
    const currentHouse = getCurrentPlayerByRole(players, role, outPurchase)
    const maxHouse = getMaxPlayerByRole(role)
    const maxPurchaseByRole = getMaxPurchaseByRole(role, currentHouse)

    return (
        <div className={s.container}>
            <div className={s.stats}>
                <div className={s.row}>
                    <div className={s.label}>You</div>
                    <div className={s.value}>{team.emoji}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>💰</div>
                    <div className={s.value}>{team.credits}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>Free 💰</div>
                    <div className={s.value}>{budget}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>{role.toUpperCase()} 🏠</div>
                    <div className={s.value}>{currentHouse}/{maxHouse}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>{role.toUpperCase()} 🔥</div>
                    <div className={s.value}>{inPurchase}/{maxPurchaseByRole}</div>
                </div>
            </div>
        </div>
    )
}