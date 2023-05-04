import { useState } from "react"
import { useTeams } from "../../queries/teams"
import { useCalendar } from "../../queries/calendar"
import { MatchCard } from "../../components/match/card/MatchCard"
import { Match } from "types/matches"
import { FullPageLoader } from "../../components/generalUI/fullPageLoader/FullPageLoader"
import { PageController } from "../../components/generalUI/pageController/PageController"
import { LinkIconButton } from "../../components/generalUI/linkIconButton/LinkIconButton"
import s from "./Home.module.css"
import { getCurrentMatchDay } from "../../helpers"
import { SwipeListener } from "../../components/generalUI/swipeListener/SwipeListener"

export const Home = () => {
    // const [day, setDay] = useState<number>(getCurrentMatchDay())
    const [day, setDay] = useState<number>(32)
    const c = useCalendar(day)
    const t = useTeams()
    const isLoading = c.isLoading || t.isLoading
    const isError = c.isError || t.isError

    return (
        <div className={s.mainContainer}>
            <PageController page={day} setPage={setDay} tot={38}/>
            <SwipeListener 
                onSwipeLeft={() => setDay(day < 38 ? day + 1 : 38)} 
                onSwipeRight={() => setDay(day ? day - 1 : 0)}
                className={s.outerContainer}
            >
                <div className={s.container}>
                    {isLoading ? <FullPageLoader/> : null}
                    {isError ? <p>An error occourred while fetching matches</p> : null}
                    <div className={s.cardContainer}>
                        {c.data ? c.data.map((match: Match, i: number) => (
                            <MatchCard key={i} match={match} teams={t.data || []}/>
                        )) : null}
                    </div>
                    <div className={s.articlecontainer}>
                        <div className={s.articleText}>
                            <p>La giornata di calcio appena conclusa ha riservato diverse emozioni e sorprese, con partite combattute e risultati che influiscono sulla classifica. In particolare, la sfida tra Gyomber Team e New Team ha visto la vittoria dei koala per 2 a 0, dimostrando che, nonostante il penultimo posto in classifica, non mancano di determinazione e talento.</p>
                            <p>La partita tra Ebrei e Galline è terminata con un risultato di 3 a 1 in favore degli Ebrei, che consolidano così la loro posizione al quarto posto in classifica. Questa vittoria mette in evidenza la forza dell'undici leonino, che si avvicina al podio.</p>
                            <p>La Kebab squad ha subito una pesante sconfitta contro Don Rodrigo, con un risultato di 0 a 3. Nonostante la loro quinta posizione in classifica, la Kebab squad dovrà lavorare sulla propria strategia per evitare ulteriori delusioni in futuro.</p>
                            <p>Nell'incontro tra Del Piero Team e Emeralde Luminarie, il pareggio per 1 a 1 ha dimostrato l'equilibrio tra le due squadre. Entrambe si trovano nella parte bassa della classifica, ma hanno lottato fino all'ultimo minuto per portare a casa punti preziosi.</p>
                            <p>Infine, la sfida tra Babilonese e Real Cafoni ha visto i tigrotti vincere per 1 a 0, portandoli al primo posto in classifica con un totale di 12 punti. La Babilonese, pur avendo perso, si posiziona al secondo posto con 11 punti.</p>
                            <p>In conclusione, la giornata di calcio ha rimescolato le carte in tavola e confermato il livello di competitività del campionato. Le prossime giornate saranno decisive per determinare le sorti delle squadre e assegnare il titolo alla formazione più meritevole.</p>
                        </div>
                    </div>
                </div>
            </SwipeListener>
            <LinkIconButton link="teams"/>
        </div>
    )
}