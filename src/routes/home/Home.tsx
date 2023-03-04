import { Link } from "react-router-dom"
import { useCharacters } from "../../hooks/characters/all"

const Home = () => {
    const { isLoading, error, characters } = useCharacters()
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {characters.map(character => (
                 <Link 
                    key={character.id} 
                    to={`/profile/${character.id}`}
                >
                        <p key={character.id}>{character.name}</p>
                </Link>
                
            ))}
        </>
    )
}

export default Home