import { Player } from "../../../../../types/players"
import { getPlayerFormationIcon, getRoleEmoji, getPlayerLeavingName } from "../../../../../helpers"
import { PreMatchFormation } from "../../../../../types/matches"
import s from './EditFromationTable.module.css'

interface Props {
    roster: Player[]
    botMode: boolean
    formation: PreMatchFormation
    handlePlayerClick: (player: Player) => () => void
}

export const EditFromationTable = ({ roster, botMode, handlePlayerClick, formation}: Props) => { 
    return (
      <div>
        <div className={s.player}>
            <p className={s.positionH}></p>
            <p className={s.role}></p>
            <p className={`${s.name} ${s.bold}`}>NAME</p>
            <p className={`${s.name} ${s.bold}`}>FROM</p>
            <p className={`${s.value} ${s.bold}`}>FVM</p>
            <p className={`${s.value} ${s.bold}`}>PNM</p>
        </div>
        <div className={s.players}>
            {roster.map((player, i) => {
                const icon = botMode 
                    ? '🤖'
                    : getPlayerFormationIcon(player.id, formation)
                const isStarter = icon === '🏁'
                const addClass = isStarter ? s.starter : player.leaving ? s.leaving : ''
                return (
                    <div className={`${addClass} ${s.player}`} key={i}>
                        <div 
                            className={s.position}
                            onClick={handlePlayerClick(player)}
                        >
                            {icon}
                        </div>
                        <p className={s.role}>{getRoleEmoji(player.role)}</p>
                        <p className={s.name}>{getPlayerLeavingName(player)}</p>
                        <p className={s.name}>{player.team}</p>
                        <p className={s.value}>{player.fvm}</p>
                        <p className={s.value}>{player.play_next_match}</p>
                    </div>
                )
            })}
        </div>
    </div>
    )
}

