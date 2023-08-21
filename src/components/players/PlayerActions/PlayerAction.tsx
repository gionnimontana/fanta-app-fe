import { Player, Purchase } from "../../../types/players";
import { getPossiblePurchaseActions } from "../../../helpers";

interface Props {
    player?: Player;
    purchase?: Purchase;
}

export const PlayerActions = ({ player, purchase }: Props) => {
    const possibleActions = getPossiblePurchaseActions(player, purchase)

    return (
        <div>
            {possibleActions.join(', ')}
        </div>
    )
}
