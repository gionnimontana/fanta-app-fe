import { Table } from "../../../components/generalUI/table/Table";
import { Player } from "../../../types/players";
import { Team } from "../../../types/teams";
import s from "./PlayerTable.module.css";

interface Props {
  players: Player[];
  teams: Team[];
}

export const PlayerTable = ({ players, teams }: Props) => {

  const teamNameMap: { [key: string]: string } = teams.reduce(
    (acc, t) => ({ ...acc, [t.id]: t.name }), {}
  );

  return (
      <Table
        minWidth={50}
        header={<></>}
      >
        <div className={s.player}>
          <p className={s.role}></p>
          <p className={`${s.name} ${s.bold}`}>NAME</p>
          <p className={`${s.name} ${s.bold}`}>FROM</p>
          <p className={`${s.name} ${s.bold}`}>Team</p>
          <p className={`${s.value} ${s.bold}`}>FVM</p>
          <p className={`${s.value} ${s.bold}`}>SI</p>
        </div>
        <div className={s.players}>
            {players.map((player, i) => {
                return (
                    <div className={s.player} key={i}>
                        <p className={s.role}>{player.role}</p>
                        <p className={s.name}>{player.name}</p>
                        <p className={s.name}>{player.team}</p>
                        <p className={s.name}>{teamNameMap[player.fanta_team]}</p>
                        <p className={s.value}>{player.fvm}</p>
                        <p className={s.value}>{player.starter_index}</p>
                    </div>
                )
            })}
        </div>
      </Table>
  );
}
