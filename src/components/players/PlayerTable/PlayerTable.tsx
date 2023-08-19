import { Table } from "../../generalUI/table/Table";
import { Player, Purchase } from "../../../types/players";
import { Team } from "../../../types/teams";
import s from "./PlayerTable.module.css";
import { getTeamEmoji } from "../../../helpers";
import { PlayerDetails } from "./PlayerDetails/PlayerDetails";
import { useState } from "react";

interface Props {
  players: Player[];
  teams: Team[];
  activePurchases: Purchase[];
}

export const PlayerTable = ({ players, teams, activePurchases }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const activePurchaseIds = activePurchases.map((p) => p.player);

  const isPurchase = (player: Player) => {
    return activePurchaseIds.includes(player.id)
  }

  const decoratedPlayerName = (player: Player) => {
    if (isPurchase(player)) return `🔥 ${player.name}`
    else return player.name
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
          <p className={`${s.value} ${s.bold}`}>FVM</p>
          <p className={`${s.value} ${s.bold}`}>SI</p>
        </div>
        <div className={s.players}>
            {players.map((player, i) => {
                return (
                    <div className={pCn(player)} key={i} onClick={() => setSelectedPlayer(player)}>
                        <p className={s.role}>{player.role}</p>
                        <p className={s.team}>{getTeamEmoji(player.fanta_team, teams)}</p>
                        <p className={s.name}>{decoratedPlayerName(player)}</p>
                        <p className={s.from}>{player.team}</p>
                        <p className={s.value}>{player.fvm}</p>
                        <p className={s.value}>{player.starter_index}</p>
                    </div>
                )
            })}
        </div>
      </Table>
      {selectedPlayer ? (
        <PlayerDetails 
          onClose={() => setSelectedPlayer(null)}
          player={selectedPlayer}
          purchase={activePurchases.find(p => p.player === selectedPlayer.id)}
        />
      ) : null}
    </>
  );
}
