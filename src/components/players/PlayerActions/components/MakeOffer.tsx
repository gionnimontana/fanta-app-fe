import { Player, Purchase } from "../../../../types/players";
import { LoadingButton } from "../../../../components/generalUI/loadingButton/LoadingButton";
import { useEffect, useState } from "react";
import { pb } from "../../../../helpers/pb";
import { smartNotification } from "../../../../components/generalUI/notifications/notifications"
import { NumberField } from "../../../../components/generalUI/numberField/NumberField";
import { getAuthUserTeamId, makePurchaseOffer } from "../../../../helpers";
import { useParams } from "react-router-dom";

interface Props {
  purchase?: Purchase;
  player?: Player;
  teamBudget?: number;
  haveFreeRoleSlots?: boolean;
}

export const MakeOffer = ({ purchase, player, teamBudget, haveFreeRoleSlots }: Props) => {
    const { league } = useParams()
    const userTeam = getAuthUserTeamId(league)
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
      if (!player) return smartNotification('Qualcosa è andato storto, nessun acquisto trovato, contatta l\'amministratore')
      setLoading(true)
      await makePurchaseOffer(userTeam, purchase, player, offerValue)
      setLoading(false)
    }


    return (
      <>
        {freePlayer && isUToffer && (
          <div style={{padding: '0 2rem', fontSize: '0.9rem'}}>Rilancio automatico per questo giocatore settato a: <strong>{purchase?.max_price}</strong></div>
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
                {purchase?.to_team === userTeam ? 'Aggiorna offerta': 'Conferma offerta'}
              </LoadingButton>
              <div style={{padding: '2rem'}}>
                {freePlayer && isUToffer ? (
                  <>Premendo questo bottone stai configurando il rilancio automatico a: {offerValue}</>
                ) : (
                  <>
                    Premendo questo bottone farai un offerta di {currentOffer} crediti per {player?.name}, l'offerta non puo' essere ritirata.
                    {currentOffer < offerValue && `Se un altro utente fa un offerta per questo giocatore, la tua offerta verrà automaticamente incrementata di 1 fino a raggiungere ${offerValue} crediti`}
                  </>
                )}
              </div>
            </>
          ): (
            <div style={{padding: '2rem'}}>
              Non hai abbastanya buget per fare un offerta per questo giocatore, per fare credito potresti svincolare un tuo giocatore (avresti bisogno di {baseOffer} crediti ma ne hai {teamBudget || 0})
            </div>
          )
        : (
          <div style={{padding: '2rem'}}>
            Non hai abbastanza slot liberi per fare un offerta per questo giocatore, per fare spazio potresti svincolare un tuo giocatore dello stesso ruolo
          </div>
        )}
      </>

    )
}
