import { Player, Purchase } from "types/players"
import { Modal } from "../../../../components/generalUI/modal/Modal"
import s from './PlayerDetails.module.css'

interface Props {
    player: Player
    purchase?: Purchase
    onClose: () => void
}

export const PlayerDetails = ({onClose, player, purchase}: Props) => {
    const styledHeader = (pl: Player, pu: Purchase | undefined) => {
        let name = `${pl.name} (${pl.team})`
        if (pu) name = `🔥 ${name} 🔥`
        return name
    }

    return (
        <Modal onClose={onClose}>
            <div className={s.container}>
                <div className={s.name}>
                    {styledHeader(player, purchase)}
                </div>
            </div>
        </Modal>
    )
}