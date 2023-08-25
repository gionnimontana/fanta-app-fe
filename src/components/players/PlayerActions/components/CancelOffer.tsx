import { Purchase } from "../../../../types/players";
import { smartNotification } from "../../../../components/generalUI/notifications/notifications"
import { useState } from "react";

interface Props {
    purchase?: Purchase;
}

export const CancelOffer = ({ purchase }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    const onClick = async () => {
      if (!purchase) smartNotification('Something went wrong, no purchase found')
      setLoading(true)
      
    }

    return (
        <div style={{padding: '2rem'}}>
          You have an active offer for this player
          {purchase?.validated 
            ? '. It has been accepted so if no other team make a greater offer then yours player will be tranfered to your team within the next 48 hours from last update' 
            : ' but it has not been accepted yet, you must wait for the other team to accept it'
          }
        </div>
    )
}
