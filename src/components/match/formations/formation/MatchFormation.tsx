import { getFormationScore } from "../../../../helpers";
import { PlayerVote } from "../../../../types/matches";
import s from './MatchFormation.module.css'

interface Props {
    formation: PlayerVote[]
}

export const MatchFormation = ({ formation }: Props) => {
    const tot = getFormationScore(formation)
    return (
        <div className={s.container}>
            {tot ? <div className={s.tot}>{tot}</div> : null}
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