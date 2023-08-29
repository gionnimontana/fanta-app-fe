import { getPreviousAndNextTeamNavigator, getRoster } from '../../helpers';
import { useTeamPlayers } from '../../queries/players';
import { useTeams } from '../../queries/teams';
import { useNavigate, useParams } from 'react-router-dom';
import { AppScreen } from '../../components/generalUI/appScreen/AppScreen';
import { Table } from '../../components/generalUI/table/Table';
import { BottomButton } from '../../components/generalUI/bottomButton/BottonButton';
import { routes } from '../../constants/routes';
import s from './Team.module.css'
import { ArrowSwiperListener } from '../../components/generalUI/swipeListener/ArrowSwiperListener';
import { LinkIconButton } from '../../components/generalUI/linkIconButton/LinkIconButton';

export const Team = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const teams = useTeams()
    const team = teams.data?.find(t => t.id === id)
    const p = useTeamPlayers(id)
    const roster = getRoster(team, p.data || {})
    const loading = teams.isLoading || p.isLoading
    const cN = `${s.squad} creativeFont`
    const teamNavigator = getPreviousAndNextTeamNavigator(team, teams.data || [], navigate)

    return (
        <AppScreen loading={loading}>
            <ArrowSwiperListener 
                onSwipeLeft={teamNavigator.next}
                onSwipeRight={teamNavigator.previous}
                className={s.swipeContainer}
            >
                <Table 
                    minWidth={35}
                    header={
                        <div className={s.header}>
                            <p className={s.emoji}>{team?.emoji}</p>
                            <div className={s.headerText}>
                                <div className={cN}>{team?.name || id}</div>
                                <div className={s.credits}>{team?.credits} 💰</div>
                            </div>
                        </div>
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
                                    <p className={s.role}>{player.role}</p>
                                    <p className={s.name}>{player.name}</p>
                                    <p className={s.from}>{player.team}</p>
                                    <p className={s.value}>{player.fvm}</p>
                                    <p className={s.value}>{player.starter_index}</p>
                                    <p className={s.value}>{player.play_next_match}</p>
                                </div>
                            )
                        })}
                    </div>
                </Table>
            </ArrowSwiperListener>
            <BottomButton to={routes.Teams} label={'View all teams'}/>
            <LinkIconButton links={["market", "calendar"]}/>
        </AppScreen>
    )
}