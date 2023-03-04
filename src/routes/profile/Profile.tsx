import { Link, useParams } from "react-router-dom"
import { useCharacter } from "../../queries/characters"

const Profile = () => {
    const { id } = useParams();
    const { isLoading, isError, data } = useCharacter(id || "")

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {!id && <p>No character selected</p>}
            {isError && <p>Error</p>}
            {data && (
                <>
                    <p>{data.name}</p>
                    <p>{data.status}</p>
                    <p>{data.species}</p>
                </>
            )}
            <Link to={`/`}>
                <button>Go back</button>
            </Link>
        </>
    );
}

export default Profile