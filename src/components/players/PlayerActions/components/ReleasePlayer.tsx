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
      if (!player || !player.fanta_team) return smartNotification('Qualcosa è andato storto, nessun acquisto trovato, contatta l\'amministratore')
      setLoading(true)
      const res = await createPurchaseOffer(player.id, player.fvm - 1, player.fvm - 1)
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        smartNotification('Giocatore offerto sul mercato correttamente')
      } else smartNotification('Qualcosa è andato storto, nessun acquisto trovato, contatta l\'amministratore')
      setLoading(false)
    }

    return (
      <>
        {playerCanBeReleased && <LoadingButton loading={loading} onClick={onClick} width={'12rem'}>
            Rilascia giocatore
        </LoadingButton>}
        <div style={{padding: '2rem'}}>
          {playerCanBeReleased 
            ? 'Premendo questo bottone stai per svincolare dalla tua squadra, si aprirà automaticamente un asta con durata 24h dall\'ultimo aggiornamento, se nessun altro utente rilancia guadagnerai il valore corrente di FVM meno 1 credito per la tariffa di mercato del trasferimento'
            : 'Non puoi svincolare questo giocatore, hai raggiunto il numero minimo di giocatori per questo ruolo'
          }  
        </div>
      </>

    )
}
