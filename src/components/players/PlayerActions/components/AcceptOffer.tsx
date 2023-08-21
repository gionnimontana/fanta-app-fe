import { Purchase } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton";
import { useState } from "react";
import { updatePurchaseOffer } from "../../../../queries/players";
import { useQueryClient } from "react-query";

interface Props {
  purchase?: Purchase;
}

export const AcceptOffer = ({ purchase }: Props) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState<boolean>(false)

    const onClick = async () => {
      if (!purchase) return alert('Something went wrong, no purchase found, please contact the admin')
      setLoading(true)
      const res = await updatePurchaseOffer(purchase.id, {validated: true})
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        alert('Offer created')
      } else alert('Something went wrong, could be a bug, please contact the admin')
      setLoading(false)
    }

    return (
      <>
        {!purchase?.validated && <LoadingButton loading={loading} onClick={onClick} width={'12rem'}>
            Accept Offer
        </LoadingButton>}
        <div style={{padding: '2rem'}}>
          {purchase?.validated 
            ? 'You have validated this offer, other teams can rise offers for this player. It will be tranfered within the next 48 hours from last update, you will earn the last offer credits' 
            : 'Pressing this button you are going to offer this player on the marker, the offer will be valid for 48 hours from last update, if no other team make an offer you will get the current FVM value minus 1 credit for the transfer market fee'
          }
        </div>
      </>

    )
}
