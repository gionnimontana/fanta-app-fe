import { Link, useParams } from "react-router-dom";
import { useCharacter } from "../../hooks/characters/single";

const Profile = () => {
    const { id } = useParams();
    const { isLoading, error, character } = useCharacter(id);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {!id && <p>No character selected</p>}
            {error && <p>{error}</p>}
            {character && (
                <>
                    <p>{character.name}</p>
                    <p>{character.status}</p>
                    <p>{character.species}</p>
                </>
            )}
            <Link to={`/`}>
                <button>Go back</button>
            </Link>
        </>
    );
}

export default Profile