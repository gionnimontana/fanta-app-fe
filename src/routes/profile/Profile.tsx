import { Link, useParams } from "react-router-dom"
import { CharacterProfile } from "../../components/characterProfile/CharacterProfile";
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader";
import { useCharacter } from "../../queries/characters"
import { EpisodeWrapper } from "./episodeWrapper/EpisodeWrapper";
import { LocationWrapper } from "./locationWrapper/LocationWrapper";
import s from './Profile.module.css'

const Profile = () => {
    const { id } = useParams();
    const { isLoading, isError, data } = useCharacter(id || "")

    return (
        <div className={s.outer}>
            <div className={s.container}>
                {isLoading ? <FullPageLoader/>: null}
                {isNaN(Number(id)) ? <div className={s.noSelection}>No character selected</div> : null}
                {isError && <p>An error occourred while fetching character</p>}
                {data ? (
                    <CharacterProfile character={data}>
                        <LocationWrapper locationUrl={data.location.url}/>
                        <EpisodeWrapper urls={data.episode}/>
                    </CharacterProfile> 
                ): null}
                <Link to={`/`} className={s.backbuttonLink}>
                    <button className={s.backbutton}>View all characters</button>
                </Link>
            </div>
        </div>

    );
}

export default Profile