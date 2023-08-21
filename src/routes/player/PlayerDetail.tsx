import { useOpenPurchasePlayers, usePlayer, usePlayers } from '../../queries/players';
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
import s from './PlayerDetail.module.css'

export const PlayerDetail = () => {
    const { id } = useParams();
    const ap = usePlayers()
    const p = usePlayer(id)
    const op = useOpenPurchasePlayers()
    const t = useTeams()
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const loading = p.isLoading || op.isLoading || t.isLoading || ap.isLoading
    const isAuthenticated = pb.authStore.isValid
    const targetTeam = t.data?.find(t => t.id === pb.authStore.model?.team)
    const teamBudget = getTeamBudget(op.data || [], ap.data || {}, targetTeam)

    return (
        <AppScreen loading={loading}>
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