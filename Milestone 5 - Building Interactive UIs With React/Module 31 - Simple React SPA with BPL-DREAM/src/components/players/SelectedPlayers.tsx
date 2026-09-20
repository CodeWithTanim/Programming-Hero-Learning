import type { Dispatch, SetStateAction } from "react";
import type { Iplayer } from "../../type/playerType";
import SelectedPlayerCard from "../SelectedPlayerCard";

interface ISelectedPlayerProps {
    selectedPlayers: Iplayer[];
    setSelectedPlayers: Dispatch<SetStateAction<Iplayer[]>>;
    coin: number;
    setCoin: Dispatch<SetStateAction<number>>;
}

const SelectedPlayers = ({
    selectedPlayers,
    setSelectedPlayers,
    coin,
    setCoin,
}: ISelectedPlayerProps) => {
    // console.log(selectedPlayers, 'from compo')


    if (selectedPlayers.length === 0) {
        return (
            <h2 className="font-bold text-3xl my-10 text-center text-red-500">No Selected Player</h2>
        )
    }

    return (
        <div>
            Selected Players
            <div className="grid grid-cols-1 gap-7 mt-6">
                {selectedPlayers.map((player: Iplayer, ind: number) => {
                    return (
                        <SelectedPlayerCard
                            key={ind}
                            selectedPlayers={selectedPlayers}
                            setSelectedPlayers={setSelectedPlayers}
                            coin={coin}
                            setCoin={setCoin}
                            player={player}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SelectedPlayers;
