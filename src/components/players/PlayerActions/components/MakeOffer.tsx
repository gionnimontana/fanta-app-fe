import { Player, Purchase } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton";
import { useEffect, useState } from "react";
import { pb } from "../../../../helpers/pb";
import { smartNotification } from "../../../../components/generalUI/notifications/notifications"
import { NumberField } from "../../../../components/generalUI/numberField/NumberField";
import { makePurchaseOffer } from "../../../../helpers";

interface Props {
  purchase?: Purchase;
  player?: Player;
  teamBudget?: number;
  haveFreeRoleSlots?: boolean;
}

export const MakeOffer = ({ purchase, player, teamBudget, haveFreeRoleSlots }: Props) => {
    const userTeam = pb.authStore.model?.team;
    const baseOffer = purchase ? purchase.price + 1 : player?.fvm || 1
    const [loading, setLoading] = useState<boolean>(false)
    const [offerValue, setOfferValue] = useState<number>(baseOffer)

    useEffect(() => {
      setOfferValue(baseOffer)
    }, [baseOffer])

    const haveBudgetForOffer = Number(teamBudget) >= baseOffer

    const onClick = async () => {
      if (!player) return smartNotification('Something went wrong, no player found, please contact the admin')
      if (!userTeam) return smartNotification('Something went wrong, no team found, please contact the admin')
      setLoading(true)
      await makePurchaseOffer(userTeam, purchase, player, offerValue)
      setLoading(false)
    }

    return (
      <>
        {haveFreeRoleSlots ? 
          haveBudgetForOffer ? (
            <>
              <NumberField
                min={baseOffer}
                max={400}
                value={offerValue}
                onChange={setOfferValue}
              />
              <LoadingButton loading={loading} onClick={onClick} width={'12rem'}>
                {purchase?.to_team === userTeam ? 'Update offer': 'Make offer'}
              </LoadingButton>
              <div style={{padding: '2rem'}}>
                Pressing this button you are going to make an offer of {baseOffer} credits for {player?.name}, the offer cannot be revoked.
                {baseOffer < offerValue && `if another player makes an offer for this player, your offer will be automatically increased by 1 credit until it reaches ${offerValue} credits`}
              </div>
            </>
          ): (
            <div style={{padding: '2rem'}}>
              You don't have enough budget to make an offer for this player (you need at least {baseOffer} credits while you have {teamBudget || 0} spendable credits)
            </div>
          )
        : (
          <div style={{padding: '2rem'}}>
            You don't have enough free role slots to make an offer for this player
          </div>
        )}
      </>

    )
}
