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
    const freePlayer = Boolean(!player?.fanta_team) || Boolean(purchase?.validated)
    const currentOffer = freePlayer ? baseOffer : offerValue
    const haveBudgetForOffer = Number(teamBudget) >= baseOffer
    const isUToffer = purchase?.to_team === userTeam
    const haveSlots = isUToffer || haveFreeRoleSlots

    useEffect(() => {
      setOfferValue(baseOffer)
    }, [baseOffer])


    const onClick = async () => {
      if (!player) return smartNotification('Something went wrong, no player found, please contact the admin')
      setLoading(true)
      await makePurchaseOffer(userTeam, purchase, player, offerValue)
      setLoading(false)
    }


    return (
      <>
        {freePlayer && isUToffer && (
          <div style={{padding: '0 2rem', fontSize: '0.9rem'}}>Autoincrement for this player is set to: <strong>{purchase?.max_price}</strong></div>
        )}
        {haveSlots ? 
          haveBudgetForOffer ? (
            <>
              <NumberField
                min={baseOffer}
                max={Number(teamBudget)}
                value={offerValue}
                onChange={setOfferValue}
              />
              <LoadingButton loading={loading} onClick={onClick} width={'12rem'}>
                {purchase?.to_team === userTeam ? 'Update offer': 'Make offer'}
              </LoadingButton>
              <div style={{padding: '2rem'}}>
                {freePlayer && isUToffer ? (
                  <>Pressing this button you are going to update autoincrement to {offerValue}</>
                ) : (
                  <>
                    Pressing this button you are going to make an offer of {currentOffer} credits for {player?.name}, the offer cannot be revoked.
                    {currentOffer < offerValue && `if another player makes an offer for this player, your offer will be automatically increased by 1 credit until it reaches ${offerValue} credits`}
                  </>
                )}
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
