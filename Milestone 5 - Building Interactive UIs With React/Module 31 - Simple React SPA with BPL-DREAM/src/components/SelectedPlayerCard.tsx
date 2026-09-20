import { TbTrash } from "react-icons/tb";
import type { Iplayer } from "../type/playerType";
import type { Dispatch, SetStateAction } from "react";

interface ISelectedPlayerCardProps {
    player: Iplayer;
    selectedPlayers: Iplayer[];
    setSelectedPlayers: Dispatch<SetStateAction<Iplayer[]>>;
    coin: number;
    setCoin: Dispatch<SetStateAction<number>>;
}

const SelectedPlayerCard = ({ player, selectedPlayers, setSelectedPlayers, coin, setCoin }: ISelectedPlayerCardProps) => {

    const handleRemovePlayer = (player: Iplayer) => {
        const restPlayers = selectedPlayers.filter(selectedPlayers => selectedPlayers.PlayerName != player.PlayerName)
        setSelectedPlayers(restPlayers)
        const newCoinPrice = coin + player.price
        setCoin(newCoinPrice)
    }

    return (
        <div className="flex gap-2 justify-between items-center border-2 border-gray-200 rounded-3xl p-4 py-2">
            <div className="flex gap-2">
                <img src={player.playerImg} alt="" className="h-[60px] w-[60px]" />
                <div>
                    <h2 className="font-bold text-2xl">{player.PlayerName}</h2>
                    <p>{player.playerType}</p>
                </div>
            </div>
            <span className="text-red-500 font-bold cursor-pointer" onClick={() => handleRemovePlayer(player)}>
                <TbTrash />
            </span>
        </div>
    );
};

export default SelectedPlayerCard;