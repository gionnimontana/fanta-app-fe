import { Player, PlayerMap, Purchase } from "../../../types/players";
import { canMakeOffer, canReleasePlayer, getPossiblePurchaseActions } from "../../../helpers";
import { marketWindow } from "../../../constants/settings";
import { ReleasePlayer } from "./components/ReleasePlayer";
import { AcceptOffer } from "./components/AcceptOffer";
import { MakeOffer } from "./components/MakeOffer";
import s from "./PlayerActions.module.css";
import { useParams } from "react-router-dom";

interface Props {
    player?: Player;
    purchases: Purchase[];
    teamBudget?: number;
    teamplayers: PlayerMap
    allPlayers: PlayerMap
}

export const PlayerActions = ({ player, purchases, teamBudget, teamplayers, allPlayers }: Props) => {
    const { league } = useParams()
    const targetPurchase = purchases.find(p => p.player === player?.id)
    const possibleActions = getPossiblePurchaseActions(league, player, targetPurchase)
    const haveFreeRoleSlots = canMakeOffer(league, player?.role, allPlayers, purchases)
    const playerCanBeReleased = canReleasePlayer(player?.role, teamplayers, purchases)

    return (
        <div className={s.container}>
            {possibleActions.includes('marketClosed') && (
                <p className={s.marketCloseP}>Market is closed (reopen at: {marketWindow.start})</p>
            )}
            {possibleActions.includes('makeOffer') && (
                <MakeOffer 
                    purchase={targetPurchase} 
                    teamBudget={teamBudget} 
                    player={player}
                    haveFreeRoleSlots={haveFreeRoleSlots}
                />
            )}
            {possibleActions.includes('acceptOffer') && (
                <AcceptOffer 
                    purchase={targetPurchase}
                    playerCanBeReleased={playerCanBeReleased}
                />
            )}
            {possibleActions.includes('releasePlayer') && (
                <ReleasePlayer 
                    player={player}
                    playerCanBeReleased={playerCanBeReleased}
                />
            )}
        </div>
    )
}
