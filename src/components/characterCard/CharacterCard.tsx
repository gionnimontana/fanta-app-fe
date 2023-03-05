import { Link } from "react-router-dom"
import { CharacterMinData } from "../../types/characters"
import s from "./CharacterCard.module.css"

interface Props {
    character: CharacterMinData
}

export const CharacterCard = ({ character }: Props) => {
    return (
        <Link key={character.id} to={`/profile/${character.id}`} className={s.link}>
            <div className={s.container}>
                <p className={s.name}>{character.name}</p>
                <img src={character.image} alt={character.name} className={s.image}/>
            </div>
        </Link>
    )
}
