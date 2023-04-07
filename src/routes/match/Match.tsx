import { useMatch } from "../../queries/calendar";
import { usePlayers } from "../../queries/players";
import { useTeams } from "../../queries/teams";
import { Link, useParams } from "react-router-dom"
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader";
import s from './Match.module.css'

const Match = () => {
    const { id } = useParams();
    const m = useMatch(id || "")
    const p = usePlayers()
    const t = useTeams()

    const isLoading = m.isLoading || p.isLoading || t.isLoading

    return (
        <div className={s.outer}>
            <div className={s.container}>
                {isLoading ? <FullPageLoader/>: null}
                {isNaN(Number(id)) ? <div className={s.noSelection}>No character selected</div> : null}
                {m.isError && <p>An error occourred while fetching character</p>}
                {m.data ? (
                    <div>
                        <div className={s.match}>{m.data.match}</div>

                    </div>
                ): null}
                <Link to={`/`} className={s.backbuttonLink}>
                    <button className={s.backbutton}>View all matches</button>
                </Link>
            </div>
        </div>

    );
}

export default Match