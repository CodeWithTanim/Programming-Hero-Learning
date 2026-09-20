import type { Dispatch, SetStateAction } from "react";
import type { Iplayer } from "../../type/playerType";
import PlayerCard from "./PlayerCard";

interface IAvailablePropsType {
    players: Iplayer[];
    coin: number;
    setCoin: Dispatch<SetStateAction<number>>;
    selectedPlayers: Iplayer[];
    setSelectedPlayers: Dispatch<SetStateAction<Iplayer[]>>;
}

const AvailablePlayers = ({
    players,
    coin,
    setCoin,
    selectedPlayers,
    setSelectedPlayers,
}: IAvailablePropsType) => {
    // console.log(players, 'Player from Available Players')
    return (
        <div className="grid grid-cols-3 gap-7 mt-6">
            {players.map((player: Iplayer, index: number) => {
                return (
                    <PlayerCard
                        key={index}
                        player={player}
                        coin={coin}
                        setCoin={setCoin}
                        selectedPlayers={selectedPlayers}
                        setSelectedPlayers={setSelectedPlayers}
                    />
                );
            })}
        </div>
    );
};

export default AvailablePlayers;
