import { Purchase } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton"
import { useState } from "react";
import { deletePurchaseOffer, acceptPurchaseOffer } from "../../../../queries/players";
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
      if (!purchase) return smartNotification('Qualcosa è andato storto, nessun acquisto trovato, contatta l\'amministratore')
      setLoading(true)
      const res = await acceptPurchaseOffer(purchase.id)
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        smartNotification('Offer accepted')
      } else smartNotification('Qualcosa è andato storto, potrebbe essere un bug, contatta l\'amministratore')
      setLoading(false)
    }

    const handleDecline = async () => {
      if (!purchase) return smartNotification('Qualcosa è andato storto, nessun acquisto trovato, contatta l\'amministratore')
      setLoading(true)
      const res = await deletePurchaseOffer(purchase.id)
      if (res.ok) {
        queryClient.invalidateQueries('purchase-players')
        smartNotification('Offerta rifiutata')
      } else smartNotification('Qualcosa è andato storto, potrebbe essere un bug, contatta l\'amministratore')
      setLoading(false)
    }

    const showButton = !purchase?.validated && playerCanBeReleased
    const showDeclineButton = purchase?.from_team && !purchase?.validated

    return (
      <>
        {showButton && (
          <LoadingButton loading={loading} onClick={handleAccept} className={s.offerButton}>
              Accetta l'offerta
          </LoadingButton>
        )}
        {showDeclineButton && (
          <LoadingButton loading={loading} onClick={handleDecline} className={s.offerButton}>
            Rifiuta l'offerta
          </LoadingButton>
        )}
        <div style={{padding: '2rem'}}>
          {purchase?.validated 
            ? 'Hai convalidato questa offerta, altre squadre possono presentare offerte per questo giocatore. Sarà trasferito entro le prossime 48 ore dall\'ultimo aggiornamento, guadagnerai i crediti dell\'ultima offerta.' 
            : playerCanBeReleased
              ? 'Premendo il pulsante "Accetta Offerta" offrirai questo giocatore sul mercato, l\'offerta sarà valida per 48 ore dall\'ultimo aggiornamento; se nessuna altra squadra presenta un\'offerta, otterrai il valore corrente di FVM meno 1 credito per la tariffa di mercato del trasferimento.'
              : 'Non puoi accettare questa offerta perché hai raggiunto il numero minimo di giocatori per questo ruolo.'
          }
        </div>
      </>

    )
}