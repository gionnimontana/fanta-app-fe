import { addLeavingPlayers, getPreviousAndNextTeamNavigator, getTeamPlayers } from '../../helpers';
import { useOpenPurchasePlayers, usePlayers } from '../../queries/players';
import { useTeams } from '../../queries/teams';
import { useNavigate, useParams } from 'react-router-dom';
import { AppScreen } from '../../components/generalUI/appScreen/AppScreen';
import { BottomButton } from '../../components/generalUI/bottomButton/BottonButton';
import { routes } from '../../constants/routes';
import { LinkIconButton, LinkType } from '../../components/generalUI/linkIconButton/LinkIconButton';
import { pb } from '../../helpers/pb';
import { TeamTable } from '../../components/teams/teamTable/TeamTable';

export const Team = () => {
    const { id, league } = useParams();
    const navigate = useNavigate()
    const teams = useTeams(league)
    const team = teams.data?.find(t => t.id === id)
    const p = usePlayers(league)
    const pc = useOpenPurchasePlayers(league)
    const tp = getTeamPlayers(id, p.data || {})
    const richPlayers = addLeavingPlayers(tp, pc.data)
    const loading = teams.isLoading || p.isLoading
    const teamNavigator = getPreviousAndNextTeamNavigator(league || '', team, teams.data || [], navigate)
    const userTeam = pb.authStore.model?.team
    const links: LinkType[] = team?.id === userTeam ? ["logout", "market", "calendar"] : ["market", "calendar"]

    return (
        <AppScreen loading={loading}>
            <TeamTable teamNavigator={teamNavigator} team={team} teamPlayers={richPlayers}/>
            <BottomButton to={routes.Teams.replace(':league', league || '')} label={'Vedi tutte le squadre'}/>
            <LinkIconButton links={links}/>
        </AppScreen>
    )
}