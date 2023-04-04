import React, { SetStateAction, useEffect, useState } from 'react';
import './Main.scss';
import icon_1 from '../images/1.jpg';
import icon_2 from '../images/2.png';
import icon_3 from '../images/3.jpg';
import icon_4 from '../images/4.jpg';
import icon_5 from '../images/5.jpg';
import icon_6 from '../images/6.jpg';
import icon_7 from '../images/7.jpg';
import icon_8 from '../images/8.jpg';
import icon_9 from '../images/9.jpg';

interface SelectedPlayerState {
  playerId: number | null;
  playerImage: string | undefined;
}

type Props = {
  selectedPlayer: SelectedPlayerState;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<SelectedPlayerState>>;
  setIsReady: React.Dispatch<SetStateAction<boolean>>;
};

interface Player {
  id: number;
  name: string;
  image: string;
}

const playerData: Player[] = [
  { id: 1, name: 'Player 1', image: icon_1 },
  { id: 2, name: 'Player 2', image: icon_2 },
  { id: 3, name: 'Player 3', image: icon_3 },
  { id: 4, name: 'Player 4', image: icon_4 },
  { id: 5, name: 'Player 5', image: icon_5 },
  { id: 6, name: 'Player 6', image: icon_6 },
  { id: 7, name: 'Player 7', image: icon_7 },
  { id: 8, name: 'Player 8', image: icon_8 },
  { id: 9, name: 'Player 9', image: icon_9 },
];

export const Main: React.FC<Props> = ({
  selectedPlayer,
  setSelectedPlayer,
  setIsReady,
}) => {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [playerChoices, setPlayerChoices] = useState([0, 0]);
  const isSelected = playerIndex === playerChoices[0] || playerIndex === playerChoices[1];

  const handleChoice = (characterIndex: number) => {
    setPlayerChoices(state => {
      const nextState = [...state];

      nextState[playerIndex] = characterIndex;

      return nextState;
    });

    if (playerIndex === 0) {
      setPlayerChoices([1]);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case 'ArrowUp':
        if (playerIndex > 2) {
          setPlayerIndex(playerIndex - 3);
          setSelectedPlayer({
            playerId: playerData[playerIndex - 3].id,
            playerImage: playerData[playerIndex - 3].image,
          });
        }

        break;
      case 'ArrowDown':
        if (playerIndex < 6) {
          setPlayerIndex(playerIndex + 3);
          setSelectedPlayer({
            playerId: playerData[playerIndex + 3].id,
            playerImage: playerData[playerIndex + 3].image,
          });
        }

        break;
      case 'ArrowLeft':
        if (playerIndex % 3 !== 0) {
          setPlayerIndex(playerIndex - 1);
          setSelectedPlayer({
            playerId: playerData[playerIndex - 1].id,
            playerImage: playerData[playerIndex - 1].image,
          });
        }

        break;
      case 'ArrowRight':
        if (playerIndex % 3 !== 2) {
          setPlayerIndex(playerIndex + 1);
          setSelectedPlayer({
            playerId: playerData[playerIndex + 1].id,
            playerImage: playerData[playerIndex + 1].image,
          });
        }

        break;

      case 'Enter':
        handleChoice(1);

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [playerIndex]);

  return (
    <>
      <h1 className="starter">Select your fighter</h1>
      <button
        type="button"
        className="button"
        onClick={() => {
          setIsReady(true);
        }}
      >
        Please click enter to play
      </button>
      <div className="table">
        <div role="button" tabIndex={0}>
          <img
            src={
              selectedPlayer.playerImage ? selectedPlayer.playerImage : icon_1
            }
            alt="1 Player"
            width="250"
            height="250"
            className="table__before"
          />
        </div>
        <table className="table__body">
          <tbody>
            {[0, 1, 2].map((row) => (
              <tr key={row}>
                {[0, 1, 2].map((col) => {
                  const player = playerData[row * 3 + col];

                  return (
                    <td
                      key={col}
                      className={
                        selectedPlayer.playerId === player.id ? 'selected' : ''
                      }
                    >
                      <button
                        type="button"
                        onKeyDown={(event) => {
                          handleKeyDown(event);
                        }}
                      >
                        <img
                          src={player.image}
                          alt={player.name}
                          width="150"
                          height="150"
                          className={
                            `character ${isSelected ? 'selected' : ''}`
                          }
                        />
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
