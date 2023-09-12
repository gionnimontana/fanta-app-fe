import { useOpenPurchasePlayers, usePlayers, usePurchasesSubscription } from '../../queries/players';
import { useParams } from 'react-router-dom';
import { AppScreen } from '../../components/generalUI/appScreen/AppScreen';
import { BottomButton } from '../../components/generalUI/bottomButton/BottonButton';
import { routes } from '../../constants/routes';
import { PlayerDetails } from '../../components/players/PlayerDetails/PlayerDetails';
import { LinkIconButton } from '../../components/generalUI/linkIconButton/LinkIconButton';
import { useState } from 'react';
import { Login } from '../../components/login/Login';
import { pb } from '../../helpers/pb';
import { useTeams } from '../../queries/teams';
import { OpenPlayerPurchase } from '../../components/players/OpenPlayerPurchase/OpenPlayerPurchase';
import { PlayerActions } from '../../components/players/PlayerActions/PlayerAction';
import { getTeamBudget, getTeamPlayers } from '../../helpers';
import { TeamMarketHeader } from '../../components/teams/teamMarketHeader/TeamMarketHeader';
import s from './PlayerDetail.module.css'

export const PlayerDetail = () => {
    usePurchasesSubscription()
    const { id, league } = useParams();
    const op = useOpenPurchasePlayers(league)
    const t = useTeams(league)
    const targetTeam = t.data?.find(t => t.id === pb.authStore.model?.team)
    const ap = usePlayers(league)
    const tp = getTeamPlayers(targetTeam?.id, ap.data || {})
    const p = (ap.data && id) ? ap.data[id] : undefined
    const loading = op.isLoading || t.isLoading || ap.isLoading
    const isAuthenticated = pb.authStore.isValid
    const teamBudget = getTeamBudget(op.data || [], targetTeam)
    
    const [showLogin, setShowLogin] = useState<boolean>(false)

    return (
        <AppScreen 
            loading={loading}
            header={targetTeam ? (
                <TeamMarketHeader 
                    team={targetTeam} 
                    budget={teamBudget} 
                    purchases={op.data || []}
                    role={p?.role || ''}
                    teamplayers={tp}
                    allPlayers={ap.data || {}}
                />
            ) : null}
        >
            {p && <PlayerDetails
                player={p}
                purchase={op.data?.find(p => p.player === id)}
                teams={t.data || []}
            />}
            <OpenPlayerPurchase 
                player={p} 
                activePurchases={op.data || []}
                teams={t.data || []}
            />
            {!isAuthenticated 
                ? <LinkIconButton links={['login']} onClick={() => setShowLogin(true)}/> 
                : <PlayerActions
                    player={p}
                    purchases={op.data || []}
                    teamBudget={teamBudget}
                    teamplayers={tp}
                    allPlayers={ap.data || {}}
                />
            }
            {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
            <BottomButton 
                to={routes.Market.replace(':league', league || '')} 
                label={'Vedi tutti i giocatori'}
            />
        </AppScreen>
    )
}