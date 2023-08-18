import { Table } from "../../generalUI/table/Table";
import { Player } from "../../../types/players";
import { Team } from "../../../types/teams";
import s from "./PlayerTable.module.css";
import { getTeamEmoji } from "../../../helpers";

interface Props {
  players: Player[];
  teams: Team[];
}

export const PlayerTable = ({ players, teams }: Props) => {

  return (
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
                return (
                    <div className={s.player} key={i}>
                        <p className={s.role}>{player.role}</p>
                        <p className={s.team}>{getTeamEmoji(player.fanta_team, teams)}</p>
                        <p className={s.name}>{player.name}</p>
                        <p className={s.from}>{player.team}</p>
                        <p className={s.value}>{player.fvm}</p>
                        <p className={s.value}>{player.starter_index}</p>
                    </div>
                )
            })}
        </div>
      </Table>
  );
}
