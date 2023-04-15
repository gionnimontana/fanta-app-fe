import { getRoster } from '../../helpers';
import { usePlayers } from '../../queries/players';
import { useTeam } from '../../queries/teams';
import { useParams } from 'react-router-dom';
import { AppScreen } from '../../components/generalUI/appScreen/AppScreen';
import { Table } from '../../components/generalUI/table/Table';
import { BottomButton } from '../../components/generalUI/bottomButton/BottonButton';
import { routes } from '../../constants/routes';
import s from './Team.module.css'

export const Team = () => {
    const { id } = useParams();
    const t = useTeam(id || '');
    const p = usePlayers()
    const roster = getRoster(t.data, p.data || {})
    const loading = t.isLoading || p.isLoading
    const cN = `${s.squad} creativeFont`

    return (
        <AppScreen loading={loading}>
            <Table 
                minWidth={25}
                header={
                    <div className={s.header}>
                        <p className={s.emoji}>{t.data?.emoji}</p>
                        <div className={s.headerText}>
                            <div className={cN}>{t.data?.name || id}</div>
                            <div className={s.credits}>{t.data?.credits} 💰</div>
                        </div>
                    </div>
                }
            >
                <div className={s.player}>
                    <p className={s.role}></p>
                    <p className={`${s.name} ${s.bold}`}>NAME</p>
                    <p className={`${s.name} ${s.bold}`}>FROM</p>
                    <p className={`${s.value} ${s.bold}`}>PRICE</p>
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
                                <p className={s.name}>{player.team}</p>
                                <p className={s.value}>{player.price}</p>
                                <p className={s.value}>{player.fvm}</p>
                                <p className={s.value}>{player.starter_index}</p>
                                <p className={s.value}>{player.play_next_match}</p>
                            </div>
                        )
                    })}
                </div>
            </Table>
            <BottomButton to={routes.Teams} label={'View all teams'}/>
        </AppScreen>
    )
}