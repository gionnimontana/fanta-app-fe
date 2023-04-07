import { PlayerVote } from "../../../../types/matches";
import s from './MatchFormation.module.css'

interface Props {
    formation: PlayerVote[]
}

export const MatchFormation = ({ formation }: Props) => {
    return (
        <div className={s.container}>
            {formation.map((player, i) => {
                return (
                    <div className={s.player} key={i}>
                        <p className={s.role}>{player.role}</p>
                        <p className={s.name}>{player.name}</p>
                        <p className={s.vote}>{player.vote}</p>
                    </div>
                )
            })
            }
        </div>

    );
}