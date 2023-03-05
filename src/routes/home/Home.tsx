import { useState } from "react"
import { CharacterCard } from "../../components/characterCard/CharacterCard"
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader"
import { PageController } from "../../components/pageController/PageController"
import { useCharacters } from "../../queries/characters"
import s from "./Home.module.css"

const Home = () => {
    const [page, setPage] = useState<number>(1)
    const { isLoading, data, isError, error } = useCharacters(page)

    return (
        <div className={s.mainContainer}>
            <PageController page={page} setPage={setPage} tot={data?.info.pages || 0}/>
            <div className={s.outerContainer}>
                <div className={s.container}>
                    {isLoading ? <FullPageLoader/> : null}
                    {isError ? <p>An error occourred while fetching characters</p> : null}
                    {data ? data.results.map(character => (
                        <CharacterCard key={character.id} character={character} />
                    )) : null}
                </div>
            </div>
        </div>
    )
}

export default Home