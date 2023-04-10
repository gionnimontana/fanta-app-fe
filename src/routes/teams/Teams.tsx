import { FullPageLoader } from "../../components/generalUI/fullPageLoader/FullPageLoader"
import { useTeams } from "../../queries/teams"
import s from "./Teams.module.css"

export const Teams = () => {
    const t = useTeams()
    const loading = t.isLoading

    return (
        <div className={s.mainContainer}>
            <div className={s.outerContainer}>
                <div className={s.container}>
                    {loading ? <FullPageLoader/> : null}
                    <div className={s.cardContainer}>
                        {t.data? t.data.map((team, i) => {
                        return (
                            <div className={s.card} key={i}>
                                <p className={s.role}>{team.name}</p>
                                <p className={s.name}>{team.credits}</p>
                            </div>
                        )
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}