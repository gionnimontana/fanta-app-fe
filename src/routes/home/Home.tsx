import { useState } from "react"
import { CharacterCard } from "../../components/characterCard/CharacterCard"
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader"
import { useCharacters } from "../../queries/characters"
import s from "./Home.module.css"

const Home = () => {
    const [page, setPage] = useState<number>(1)
    const { isLoading, data, isError } = useCharacters(page)
    return (
        <div>
            <div className={s.container}>
                {isLoading ? <FullPageLoader/> : null}
                {isError ? <p>Error</p> : null}
                {data ? data.map(character => (
                    <CharacterCard key={character.id} character={character} />
                )) : null}
            </div>
            <button className={s.button} onClick={() => setPage(page + 1)}>Load more</button>
        </div>
    )
}

export default Home