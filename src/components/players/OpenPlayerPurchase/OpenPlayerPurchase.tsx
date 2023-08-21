import { Player, Purchase } from "../../../types/players";
import { Team } from "../../../types/teams";
import s from './OpenPlayerPurchase.module.css'
import { getTeamEmoji } from "../../../helpers";

interface Props {
    player?: Player;
    teams: Team[];
    activePurchases: Purchase[];
}

export const OpenPlayerPurchase = ({ player, teams, activePurchases }: Props) => {
    const openPurchase = player ? activePurchases.find(p => p.player === player.id) : undefined
    const acceptIcon = openPurchase?.validated ? '✅' : '❌'
    const expireString = openPurchase?.updated || ''
    const expire = expireString.substring(0, expireString.indexOf('.'));

    return (
        <div className={s.container}>
            {openPurchase 
                ? <div>
                    <div>🔥🔥🔥</div>
                    <div className={s.stats}>
                        <div className={s.row}>
                            <div className={s.label}>From</div>
                            <div className={s.value}>{getTeamEmoji(openPurchase.to_team, teams)}</div>
                        </div>
                        <div className={s.row}>
                            <div className={s.label}>💰</div>
                            <div className={s.value}>{openPurchase.price}</div>
                        </div>
                        <div className={s.doublerow}>
                            <div className={s.label}>Last update</div>
                            <div className={s.date}>{expire}</div>
                        </div>
                        <div className={s.row}>
                            <div className={s.label}>Accepted</div>
                            <div className={s.value}>{acceptIcon}</div>
                        </div>
                    </div>
                </div> 
                : <div>Player have no active offers</div>
            }
        </div>
    )
}