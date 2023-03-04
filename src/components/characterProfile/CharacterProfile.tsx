import { ReactNode } from "react"
import { Character } from "../../types/characters"
import s from './CharacterProfile.module.css'

interface Props {
    character: Character
    children?: ReactNode
}

export const CharacterProfile = ({ character, children }: Props) => {
    return (
        <div className={s.container}>
            <h1 className={s.title}>{character.name}</h1>
            <div className={s.imageWrapper}>
                <img src={character.image} alt={character.name} className={s.image}/>
            </div>
            <div className={s.infoBlock}>
                <div className={s.mainBlock}>
                    <div className={s.infoBlockTitle}>Profile</div>
                    <div className={s.infoDuple}>
                        <div className={s.infoTitle}>Status:</div>
                        <div className={s.infoValue}>{character.status}</div>
                    </div>
                    <div className={s.infoDuple}>
                        <div className={s.infoTitle}>Species:</div>
                        <div className={s.infoValue}>{character.species}</div>
                    </div>
                    <div className={s.infoDuple}>
                        <div className={s.infoTitle}>Gender:</div>
                        <div className={s.infoValue}>{character.gender}</div>
                    </div>
                </div>
                {children}
           </div>
        </div>
    )
}
