import { Purchase } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton"
import { useState } from "react";
import { updatePurchaseOffer, deletePurchaseOffer } from "../../../../queries/players";
import { useQueryClient } from "react-query"
import { smartNotification } from "../../../../components/generalUI/notifications/notifications"
import s from './style.module.css'

interface Props {
  purchase?: Purchase;
  playerCanBeReleased?: boolean;
}

export const AcceptOffer = ({ purchase, playerCanBeReleased }: Props) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState<boolean>(false)

    const handleAccept = async () => {
      if (!purchase) return smartNotification('Something went wrong, no purchase found, please contact the admin')
      setLoading(true)
      const res = await updatePurchaseOffer(purchase.id, {validated: true})
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        smartNotification('Offer created')
      } else smartNotification('Something went wrong, could be a bug, please contact the admin')
      setLoading(false)
    }

    const handleDecline = async () => {
      if (!purchase) return smartNotification('Something went wrong, no purchase found, please contact the admin')
      setLoading(true)
      const res = await deletePurchaseOffer(purchase.id)
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        smartNotification('Offer declined')
      } else smartNotification('Something went wrong, could be a bug, please contact the admin')
      setLoading(false)
    }

    const showButton = !purchase?.validated && playerCanBeReleased
    const showDeclineButton = purchase?.from_team

    return (
      <>
        {showButton && (
          <LoadingButton loading={loading} onClick={handleAccept} className={s.offerButton}>
              Accept Offer
          </LoadingButton>
        )}
        {showDeclineButton && (
          <LoadingButton loading={loading} onClick={handleDecline} className={s.offerButton}>
            Decline Offer
          </LoadingButton>
        )}
        <div style={{padding: '2rem'}}>
          {purchase?.validated 
            ? 'You have validated this offer, other teams can rise offers for this player. It will be tranfered within the next 48 hours from last update, you will earn the last offer credits' 
            : playerCanBeReleased
              ? 'Pressing "Accept Offer" button you are going to offer this player on the market, the offer will be valid for 48 hours from last update, if no other team make an offer you will get the current FVM value minus 1 credit for the transfer market fee'
              : 'You cannot accept this offer because you have reached the minimum number of players for this role'
          }
        </div>
      </>

    )
}
