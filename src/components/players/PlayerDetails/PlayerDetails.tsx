import { Player, Purchase } from "types/players"
import s from './PlayerDetails.module.css'

interface Props {
    player: Player
    purchase?: Purchase
}

export const PlayerDetails = ({player, purchase}: Props) => {
    const styledHeader = (pl: Player, pu: Purchase | undefined) => {
        let name = `${pl.name} (${pl.team})`
        if (pu) name = `🔥 ${name} 🔥`
        return name
    }

    return (
        <div className={s.container}>
            <div className={s.name}>
                {styledHeader(player, purchase)}
            </div>
        </div>
    )
}