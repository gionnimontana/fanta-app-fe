import { Player } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton";
import { useState } from "react";
import { createPurchaseOffer } from "../../../../queries/players";
import { useQueryClient } from "react-query";

interface Props {
    player?: Player;
}

export const ReleasePlayer = ({ player }: Props) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState<boolean>(false)

    const onClick = async () => {
      if (!player) return alert('Something went wrong, no player found, please contact the admin')
      setLoading(true)
      const res = await createPurchaseOffer(player.id, player.fanta_team, null, player.fvm - 1)
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        alert('Player offered to the market successfully')
      } else alert('Something went wrong, could be a bug, please contact the admin')
      setLoading(false)
    }

    return (
      <>
        <LoadingButton loading={loading} onClick={onClick} width={'12rem'}>
            Release player
        </LoadingButton>
        <div style={{padding: '2rem'}}>
          Pressing this button you are going to offer this player on the marker, the offer will be valid for 48 hours from last update, if no other team make an offer you will get the current FVM value minus 1 credit for the transfer market fee  
        </div>
      </>

    )
}
