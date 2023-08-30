import { Player, Purchase } from "../../../types/players"
import s from './PlayerDetails.module.css'
import { getRoleEmoji, getTeamEmoji } from "../../../helpers"
import { Team } from "../../../types/teams"

interface Props {
    player: Player
    purchase?: Purchase
    teams: Team[]
}

export const PlayerDetails = ({player, purchase, teams}: Props) => {
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
            <div className={s.stats}>
                <div className={s.row}>
                    <div className={s.label}>Role</div>
                    <div className={s.value}>{getRoleEmoji(player.role)}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>Team</div>
                    <div className={s.value}>{getTeamEmoji(player.fanta_team, teams)}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>FVM</div>
                    <div className={s.value}>{player.fvm}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>SI</div>
                    <div className={s.value}>{player.starter_index}</div>
                </div>
                <div className={s.row}>
                    <div className={s.label}>PNM</div>
                    <div className={s.value}>{player.play_next_match}</div>
                </div>
            </div>
        </div>
    )
}