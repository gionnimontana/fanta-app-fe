import { Player, Purchase } from "types/players"
import { Modal } from "../../../../components/generalUI/modal/Modal"
import s from './PlayerDetails.module.css'

interface Props {
    player: Player
    purchase?: Purchase
    onClose: () => void
}

export const PlayerDetails = ({onClose, player, purchase}: Props) => {

    return (
        <Modal onClose={onClose}>
            <div className={s.container}>
                <div className={s.name}>
                    {player.name} ({player.team})
                </div>
            </div>
        </Modal>
    )
}