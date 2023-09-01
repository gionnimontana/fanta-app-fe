import { getPreviousAndNextTeamNavigator, getRoleEmoji, getRoster, getTeamPlayers } from '../../helpers';
import { usePlayers } from '../../queries/players';
import { useTeams } from '../../queries/teams';
import { useNavigate, useParams } from 'react-router-dom';
import { AppScreen } from '../../components/generalUI/appScreen/AppScreen';
import { Table } from '../../components/generalUI/table/Table';
import { BottomButton } from '../../components/generalUI/bottomButton/BottonButton';
import { routes } from '../../constants/routes';
import s from './Team.module.css'
import { ArrowSwiperListener } from '../../components/generalUI/swipeListener/ArrowSwiperListener';
import { LinkIconButton, LinkType } from '../../components/generalUI/linkIconButton/LinkIconButton';
import { pb } from '../../helpers/pb';

export const Team = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const teams = useTeams()
    const team = teams.data?.find(t => t.id === id)
    const p = usePlayers()
    const teamPlayers = getTeamPlayers(team?.id, p.data || {})
    const roster = getRoster(team, teamPlayers)
    const loading = teams.isLoading || p.isLoading
    const cN = `${s.squad} creativeFont`
    const teamNavigator = getPreviousAndNextTeamNavigator(team, teams.data || [], navigate)
    const userTeam = pb.authStore.model?.team
    const links: LinkType[] = team?.id === userTeam ? ["logout", "market", "calendar"] : ["market", "calendar"]

    return (
        <AppScreen loading={loading}>
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
                            <div className={cN}>{team?.name || id}</div>
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
            <BottomButton to={routes.Teams} label={'View all teams'}/>
            <LinkIconButton links={links}/>
        </AppScreen>
    )
}