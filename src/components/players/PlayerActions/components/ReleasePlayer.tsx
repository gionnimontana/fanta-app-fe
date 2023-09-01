import { Player } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton";
import { useState } from "react";
import { createPurchaseOffer } from "../../../../queries/players";
import { smartNotification } from "../../../../components/generalUI/notifications/notifications"
import { useQueryClient } from "react-query";

interface Props {
    player?: Player;
    playerCanBeReleased?: boolean;
}

export const ReleasePlayer = ({ player, playerCanBeReleased }: Props) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState<boolean>(false)

    const onClick = async () => {
      if (!player || !player.fanta_team) return smartNotification('Something went wrong, no player found, please contact the admin')
      setLoading(true)
      const res = await createPurchaseOffer(player.id, player.fanta_team, null, player.fvm - 1, player.fvm - 1)
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        smartNotification('Player offered to the market successfully')
      } else smartNotification('Something went wrong, could be a bug, please contact the admin')
      setLoading(false)
    }

    return (
      <>
        {playerCanBeReleased && <LoadingButton loading={loading} onClick={onClick} width={'12rem'}>
            Release player
        </LoadingButton>}
        <div style={{padding: '2rem'}}>
          {playerCanBeReleased 
            ? 'Pressing this button you are going to offer this player on the marker, the offer will be valid for 48 hours from last update, if no other team make an offer you will get the current FVM value minus 1 credit for the transfer market fee'
            : 'You cannot release this player because you have reached the minimum number of players for this role'
          }  
        </div>
      </>

    )
}
