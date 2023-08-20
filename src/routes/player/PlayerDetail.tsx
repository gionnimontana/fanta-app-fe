import { useOpenPurchasePlayers, usePlayer } from '../../queries/players';
import { useParams } from 'react-router-dom';
import { AppScreen } from '../../components/generalUI/appScreen/AppScreen';
import { BottomButton } from '../../components/generalUI/bottomButton/BottonButton';
import { routes } from '../../constants/routes';
import { PlayerDetails } from '../../components/players/PlayerDetails/PlayerDetails';
import { LinkIconButton } from '../../components/generalUI/linkIconButton/LinkIconButton';
import s from './PlayerDetail.module.css'
import { useState } from 'react';
import { Login } from '../../components/login/Login';
import { pb } from '../../helpers/pb';

export const PlayerDetail = () => {
    const { id } = useParams();
    const p = usePlayer(id)
    const op = useOpenPurchasePlayers()
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const loading = p.isLoading || op.isLoading
    const isAuthenticated = pb.authStore.isValid

    return (
        <AppScreen loading={loading}>
            <PlayerDetails
                player={p.data}
                purchase={op.data?.find(p => p.player === id)}
            />
            {isAuthenticated ? <LinkIconButton links={['login']} onClick={() => setShowLogin(true)}/> : null}
            {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
            <BottomButton to={routes.Market} label={'View all players'}/>
        </AppScreen>
    )
}