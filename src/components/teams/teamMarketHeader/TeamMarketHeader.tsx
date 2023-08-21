import { Player, Purchase } from "../../../types/players"
import s from './TeamMarketHeader.module.css'
import { getTeamEmoji } from "../../../helpers"
import { Team } from "../../../types/teams"

interface Props {
    team: Team
    budget: number
    purchases: Purchase[]
}

export const TeamMarketHeader = ({team, budget, purchases}: Props) => {
    const inPurchase = purchases.filter(p => p.to_team === team.id).length
    const outPurchase = purchases.filter(p => p.from_team === team.id).length

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
                    <div className={s.label}>In 🧍‍♂️</div>
                    <div className={s.value}>{inPurchase}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>Out 🧍‍♂️</div>
                    <div className={s.value}>{outPurchase}</div>
                </div>
            </div>
        </div>
    )
}