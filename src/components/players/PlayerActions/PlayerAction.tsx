import { Player, PlayerMap, Purchase } from "../../../types/players";
import { canMakeOffer, canReleasePlayer, getPossiblePurchaseActions } from "../../../helpers";
import s from "./PlayerActions.module.css";
import { marketWindow } from "../../../constants/settings";
import { CancelOffer } from "./components/CancelOffer";
import { ReleasePlayer } from "./components/ReleasePlayer";
import { AcceptOffer } from "./components/AcceptOffer";
import { MakeOffer } from "./components/MakeOffer";

interface Props {
    player?: Player;
    purchases: Purchase[];
    teamBudget?: number;
    players?: PlayerMap;
}

export const PlayerActions = ({ player, purchases, teamBudget, players }: Props) => {
    const targetPurchase = purchases.find(p => p.player === player?.id)
    const possibleActions = getPossiblePurchaseActions(player, targetPurchase)
    const haveFreeRoleSlots = canMakeOffer(player?.role, players || {}, purchases)
    const playerCanBeReleased = canReleasePlayer(player?.role, players || {}, purchases)

    return (
        <div className={s.container}>
            {possibleActions.includes('marketClosed') && (
                <p>Market is closed (reopen at: {marketWindow.start})</p>
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
            {possibleActions.includes('cancelOffer') && (
                <CancelOffer purchase={targetPurchase}/>
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
