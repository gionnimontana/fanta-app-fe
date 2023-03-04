import { Link } from "react-router-dom"
import { useCharacters } from "../../queries/characters"

const Home = () => {
    const { isLoading, data, isError } = useCharacters()
    return (
        <>
            {isLoading ? <p>Loading...</p> : null}
            {isError ? <p>Error</p> : null}
            {data ? data.map(character => (
                 <Link 
                    key={character.id} 
                    to={`/profile/${character.id}`}
                >
                        <p key={character.id}>{character.name}</p>
                </Link>
                
            )) : null}
        </>
    )
}

export default Home