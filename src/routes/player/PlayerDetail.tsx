import { useOpenPurchasePlayers, usePlayer, usePurchasesSubscription, useTeamPlayers } from '../../queries/players';
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
import { getTeamBudget } from '../../helpers';
import { TeamMarketHeader } from '../../components/teams/teamMarketHeader/TeamMarketHeader';
import s from './PlayerDetail.module.css'

export const PlayerDetail = () => {
    usePurchasesSubscription()
    const { id } = useParams();
    const p = usePlayer(id)
    const op = useOpenPurchasePlayers()
    const t = useTeams()
    const targetTeam = t.data?.find(t => t.id === pb.authStore.model?.team)
    const tp = useTeamPlayers(targetTeam?.id || '')
    const loading = p.isLoading || op.isLoading || t.isLoading || tp.isLoading
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
                    role={p.data?.role || ''}
                    players={tp.data || {}}
                />
            ) : null}
        >
            {p.data && <PlayerDetails
                player={p.data}
                purchase={op.data?.find(p => p.player === id)}
                teams={t.data || []}
            />}
            <OpenPlayerPurchase 
                player={p.data} 
                activePurchases={op.data || []}
                teams={t.data || []}
            />
            {!isAuthenticated 
                ? <LinkIconButton links={['login']} onClick={() => setShowLogin(true)}/> 
                : <PlayerActions
                    player={p.data}
                    purchases={op.data || []}
                    teamBudget={teamBudget}
                />
            }
            {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
            <BottomButton to={routes.Market} label={'View all players'}/>
        </AppScreen>
    )
}