import { useOpenPurchasePlayers, usePlayer } from '../../queries/players';
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
import s from './PlayerDetail.module.css'

export const PlayerDetail = () => {
    const { id } = useParams();
    const p = usePlayer(id)
    const op = useOpenPurchasePlayers()
    const t = useTeams()
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const loading = p.isLoading || op.isLoading || t.isLoading
    const isAuthenticated = pb.authStore.isValid

    return (
        <AppScreen loading={loading}>
            {p.data && <PlayerDetails
                player={p.data}
                purchase={op.data?.find(p => p.player === id)}
                teams={t.data || []}
            />}
            {isAuthenticated ? <LinkIconButton links={['login']} onClick={() => setShowLogin(true)}/> : null}
            {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
            <BottomButton to={routes.Market} label={'View all players'}/>
        </AppScreen>
    )
}