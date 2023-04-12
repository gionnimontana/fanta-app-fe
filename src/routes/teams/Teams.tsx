import { sortTeamByScore } from "../../helpers"
import { FullPageLoader } from "../../components/generalUI/fullPageLoader/FullPageLoader"
import { useTeams } from "../../queries/teams"
import s from "./Teams.module.css"
import { TeamCard } from "../../components/teams/card/TeamCard"
import { TeamHeaderCard } from "../../components/teams/headerCard/TeamHeaderCard"
import { LinkIconButton } from "../../components/generalUI/linkIconButton/LinkIconButton"

export const Teams = () => {
    const t = useTeams()
    const teamsByRank = sortTeamByScore(t.data || [])
    const loading = t.isLoading

    return (
        <div className={s.mainContainer}>
            <div className={s.outerContainer}>
                <div className={s.container}>
                    {loading ? <FullPageLoader/> : null}
                    <div className={s.cardContainer}>
                        <TeamHeaderCard/>
                        {teamsByRank.map((team, i) => {
                        return (
                            <TeamCard team={team} rank={i} key={i}/>
                        )
                        })}
                    </div>
                </div>
            </div>
            <LinkIconButton link="calendar"/>
        </div>
    )
}