import { FaStar, FaUserAlt } from "react-icons/fa";
import type { Iplayer } from "../../type/playerType";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Bounce, toast } from "react-toastify";

interface IPlayerCardProps {
    player: Iplayer;
    coin: number;
    setCoin: Dispatch<SetStateAction<number>>;
    selectedPlayers: Iplayer[];
    setSelectedPlayers: Dispatch<SetStateAction<Iplayer[]>>;
}

const PlayerCard = ({
    player,
    coin,
    setCoin,
    selectedPlayers,
    setSelectedPlayers,
}: IPlayerCardProps) => {
    const [isSelected, setIsSelected] = useState(false);
    // console.log(isSelected, setIsSelected, 'isSelected, setIsSelected')
    // console.log(coin, setCoin, "from card");

    const handleSelectedPlayer = () => {
        // setIsSelected(true);
        const newCoinPrice = coin - player.price;
        
        if (newCoinPrice >= 0) {
            setCoin(newCoinPrice);
            toast.success(`${player.PlayerName} is Selected Successfully`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else {
            toast.error("Your Coin is Low to Select", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }

        // ! Selected Players
        setSelectedPlayers([...selectedPlayers, player])

    };

    return (
        <div className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Player Image */}
            <figure className="relative h-64 overflow-hidden bg-base-200">
                <img
                    src={player.playerImg}
                    alt={player.PlayerName}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rating */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                    <FaStar className="text-yellow-400" />
                    {player.rating}
                </div>

                {/* Player Type */}
                <div className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-content shadow-lg">
                    {player.playerType}
                </div>
            </figure>

            {/* Card Content */}
            <div className="space-y-5 p-5">
                {/* Player Name */}
                <div>
                    <h2 className="flex items-center gap-2 text-xl font-bold">
                        <FaUserAlt className="text-primary" />
                        {player.PlayerName}
                    </h2>

                    <p className="mt-1 text-sm text-base-content/60">{player.origin}</p>
                </div>

                {/* Playing Style */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-base-200 p-3">
                        <p className="mb-1 text-xs text-base-content/50">Batting</p>
                        <p className="text-sm font-semibold">{player.battingStyle}</p>
                    </div>

                    <div className="rounded-xl bg-base-200 p-3">
                        <p className="mb-1 text-xs text-base-content/50">Bowling</p>
                        <p className="text-sm font-semibold">{player.bowlingStyle}</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-base-300" />

                {/* Bottom Section */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-base-content/50">Player Price</p>

                        <p className="text-xl font-bold text-primary">
                            ${player.price.toLocaleString()}
                        </p>
                    </div>

                    <button
                        onClick={() => handleSelectedPlayer()}
                        className={`btn btn-primary rounded-xl px-5 transition-all hover:scale-105`}
                        // disabled={isSelected === true ? true : false}
                        // disabled={isSelected === true ? true : false}
                        disabled={isSelected}
                    >
                        {isSelected === true ? "Selected" : "Choose Player"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
