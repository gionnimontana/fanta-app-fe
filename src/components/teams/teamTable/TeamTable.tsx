import { getPlayerLeavingName, getRoleEmoji, getRoster} from '../../../helpers';
import { Table } from '../../generalUI/table/Table';
import { ArrowSwiperListener } from '../../generalUI/swipeListener/ArrowSwiperListener';
import { Team } from '../../../types/teams';
import { PlayerMap } from 'types/players';
import s from './TeamTable.module.css'

interface Props {
    teamNavigator: { previous: () => void, next: () => void }
    team: Team | undefined
    teamPlayers: PlayerMap
}

export const TeamTable = ({teamNavigator, team, teamPlayers }: Props) => {
    const roster = getRoster(team, teamPlayers)
    const cN = `${s.squad} creativeFont`

    return (
        <Table 
            minWidth={35}
            header={
                <ArrowSwiperListener 
                    onSwipeLeft={teamNavigator.next}
                    onSwipeRight={teamNavigator.previous}
                    className={s.swipeContainer}
                >
                <div className={s.header}>
                    <p className={s.emoji}>{team?.emoji}</p>
                    <div className={s.headerText}>
                        <div className={cN}>{team?.name}</div>
                        <div className={s.credits}>{team?.credits} 💰</div>
                    </div>
                </div>
                </ArrowSwiperListener>
            }
        >
            <div className={s.player}>
                <p className={s.role}></p>
                <p className={`${s.name} ${s.bold}`}>NAME</p>
                <p className={`${s.from} ${s.bold}`}>FROM</p>
                <p className={`${s.value} ${s.bold}`}>FVM</p>
                <p className={`${s.value} ${s.bold}`}>SI</p>
                <p className={`${s.value} ${s.bold}`}>PNM</p>
            </div>
            <div className={s.players}>
                {roster.map((player, i) => {
                    return (
                        <div className={s.player} key={i}>
                            <p className={s.role}>{getRoleEmoji(player.role)}</p>
                            <p className={s.name}>{getPlayerLeavingName(player)}</p>
                            <p className={s.from}>{player.team}</p>
                            <p className={s.value}>{player.fvm}</p>
                            <p className={s.value}>{player.starter_index}</p>
                            <p className={s.value}>{player.play_next_match}</p>
                        </div>
                    )
                })}
            </div>
        </Table>
    )
}