import { Table } from "../../generalUI/table/Table";
import { Player, Purchase } from "../../../types/players";
import { Team } from "../../../types/teams";
import s from "./PlayerTable.module.css";
import { getRoleEmoji, getTeamEmoji } from "../../../helpers";
import { Link, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes";

interface Props {
  players: Player[];
  teams: Team[];
  activePurchases: Purchase[];
}

export const PlayerTable = ({ players, teams, activePurchases }: Props) => {
  const { league } = useParams()
  const activePurchaseIds = activePurchases.map((p) => p.player);

  const isPurchase = (player: Player) => {
    return activePurchaseIds.includes(player.id)
  }

  const getPurchaseAndName = (player: Player) => {
    let name = player.name
    let offer = ''
    if (isPurchase(player)) {
      const purchase = activePurchases.find((p) => p.player === player.id)
      offer = `${purchase?.price} ${getTeamEmoji(purchase?.to_team, teams)}`
      name = `🔥 ${player.name}`
    }
    return [name, offer]
  }

  const pCn = (player: Player) => {
    if (isPurchase(player)) return `${s.player} ${s.purchase}`
    else return s.player
  }

  return (
    <>
      <Table
        minWidth={32}
        header={<></>}
      >
        <div className={s.player}>
          <p className={s.role}></p>
          <p className={`${s.team} ${s.bold}`}></p>
          <p className={`${s.name} ${s.bold}`}>NAME</p>
          <p className={`${s.from} ${s.bold}`}>FROM</p>
          <p className={`${s.valueHeader} ${s.bold}`}>🔥</p>
          <p className={`${s.valueHeader} ${s.bold}`}>FVM</p>
          <p className={`${s.valueHeader} ${s.bold}`}>SI</p>
        </div>
        <div className={s.players}>
            {players.map((player, i) => {
                const targetRoute = routes.Player.replace(':id', player.id).replace(':league', league || '')
                const [name, offer] = getPurchaseAndName(player)
                return (
                    <Link className={pCn(player)} key={i} to={targetRoute}>
                        <p className={s.role}>{getRoleEmoji(player.role)}</p>
                        <p className={s.team}>{getTeamEmoji(player.fanta_team, teams)}</p>
                        <p className={s.name}>{name}</p>
                        <p className={s.from}>{player.team}</p>
                        <p className={s.value}>{offer}</p>
                        <p className={s.value}>{player.fvm}</p>
                        <p className={s.value}>{player.starter_index}</p>
                    </Link>
                )
            })}
        </div>
      </Table>
    </>
  );
}
