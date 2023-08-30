import { PlayerMap, Purchase } from "../../../types/players"
import s from './TeamMarketHeader.module.css'
import { Team } from "../../../types/teams"
import { getCurrentPlayerByRole, getMaxPlayerByRole, getMaxPurchaseByRole, getRoleEmoji, getCurrentPurchaseByRole } from "../../../helpers"

interface Props {
    team: Team
    budget: number
    purchases: Purchase[]
    role: string
    teamplayers: PlayerMap
    allPlayers: PlayerMap
}

export const TeamMarketHeader = ({team, budget, purchases, role, teamplayers, allPlayers}: Props) => {
    const inPurchase = purchases.filter(p => p.to_team === team.id)
    const outPurchase = purchases.filter(p => p.from_team === team.id && p.validated)
    const currentPurchaseByRole = getCurrentPurchaseByRole(allPlayers, role, inPurchase)
    const currentHouse = getCurrentPlayerByRole(teamplayers, role, outPurchase)
    const maxHouse = getMaxPlayerByRole(role)
    const maxPurchaseByRole = getMaxPurchaseByRole(role, currentHouse)

    return (
        <div className={s.container}>
            <div className={s.stats}>
                <div className={s.row}>
                    {/* <div className={s.label}>You</div> */}
                    <div className={s.teamIcon}>{team.emoji}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>💰 🏠</div>
                    <div className={s.value}>{team.credits}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>💰 🔥</div>
                    <div className={s.value}>{budget}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>{getRoleEmoji(role)} 🏠</div>
                    <div className={s.value}>{currentHouse}/{maxHouse}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>{getRoleEmoji(role)} 🔥</div>
                    <div className={s.value}>{currentPurchaseByRole}/{maxPurchaseByRole}</div>
                </div>
            </div>
        </div>
    )
}