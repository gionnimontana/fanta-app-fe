import { Table } from "../../generalUI/table/Table";
import { Player, Purchase } from "../../../types/players";
import { Team } from "../../../types/teams";
import s from "./PlayerTable.module.css";
import { getTeamEmoji } from "../../../helpers";
import { Link, Route } from "react-router-dom";
import { routes } from "../../../constants/routes";

interface Props {
  players: Player[];
  teams: Team[];
  activePurchases: Purchase[];
}

export const PlayerTable = ({ players, teams, activePurchases }: Props) => {
  const getPlayerPurchase = (player: Player) => {
    return activePurchases.find(p => p.player = player.id)
  }

  const decoratedPlayerName = (player: Player) => {
    const target = getPlayerPurchase(player)
    if (target) return `🔥 ${getTeamEmoji(target.to_team, teams)} ${player.name}`
    else return player.name
  }

  const pCn = (player: Player) => {
    if (getPlayerPurchase(player)) return `${s.player} ${s.purchase}`
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
          <p className={`${s.value} ${s.bold}`}>FVM</p>
          <p className={`${s.value} ${s.bold}`}>SI</p>
        </div>
        <div className={s.players}>
            {players.map((player, i) => {
                const targetRoute = routes.Player.replace(':id', player.id)
                return (
                    <Link className={pCn(player)} key={i} to={targetRoute}>
                        <p className={s.role}>{player.role}</p>
                        <p className={s.team}>{getTeamEmoji(player.fanta_team, teams)}</p>
                        <p className={s.name}>{decoratedPlayerName(player)}</p>
                        <p className={s.from}>{player.team}</p>
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
