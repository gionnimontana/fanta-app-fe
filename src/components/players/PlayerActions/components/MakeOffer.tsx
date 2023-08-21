import { Player, Purchase } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton";
import { useState } from "react";
import { updatePurchaseOffer, createPurchaseOffer } from "../../../../queries/players";
import { useQueryClient } from "react-query";
import { pb } from "../../../../helpers/pb";
import { NumberField } from "../../../../components/generalUI/numberField/NumberField";

interface Props {
  purchase?: Purchase;
  player?: Player;
  teamBudget?: number;
}

export const MakeOffer = ({ purchase, player, teamBudget }: Props) => {
    const queryClient = useQueryClient()
    const userTeam = pb.authStore.model?.team;
    const baseOffer = purchase ? purchase.price + 1 : player?.fvm || 1
    const [loading, setLoading] = useState<boolean>(false)
    const [offerValue, setOfferValue] = useState<number>(baseOffer)

    const haveBudgetForOffer = Number(teamBudget) >= baseOffer

    const onClick = async () => {
      if (!player) return alert('Something went wrong, no player found, please contact the admin')
      if (!userTeam) return alert('Something went wrong, no team found, please contact the admin')
      setLoading(true)
      let res: Response | { ok: false } = {ok : false}
      if (purchase) {
        res = await updatePurchaseOffer(purchase.id, {to_team: userTeam, price: offerValue})
      } else {
        res = await createPurchaseOffer(player.id, player.fanta_team, userTeam, offerValue)
      }
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        alert('Offer created')
      } else alert('Something went wrong, could be a bug, please contact the admin')
      setLoading(false)
    }

    return (
      <>
        {haveBudgetForOffer ? (
          <>
            <NumberField
              min={baseOffer}
              max={400}
              value={offerValue}
              onChange={setOfferValue}
            />
            <LoadingButton loading={loading} onClick={onClick} width={'12rem'}>
              Make Offer
            </LoadingButton>
            <div style={{padding: '2rem'}}>
              Pressing this button you are going to make an offer of {offerValue} credits for {player?.name}, the offer cannot be revoked.
            </div>
          </>
        ): (
          <div style={{padding: '2rem'}}>
            You don't have enough budget to make an offer for this player (you need at least {baseOffer} credits while you have {teamBudget || 0} spendable credits)
          </div>
        )}

      </>

    )
}