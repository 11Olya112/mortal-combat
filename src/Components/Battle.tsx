import React, { useEffect, useState } from 'react';
import icon from '../images/icon.png';
import './Battle.scss';

interface SelectedPlayerState {
  playerId: number | null;
  playerImage: string | undefined;
}

type Props = {
  selectedPlayer: SelectedPlayerState,
};

export const Battle: React.FC<Props> = ({ selectedPlayer }) => {
  const [message, setMessage] = useState('');

  const handleIconClick = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyQ':
        setMessage('Ви обрали вогонь');
        break;
      case 'KeyW':
        setMessage('Ви обрали воду');
        break;
      case 'KeyE':
        setMessage('Ви обрали вітер');
        break;
      case 'KeyR':
        setMessage('Ви обрали магію');
        break;
      case 'KeyT':
        setMessage('Ви обрали безсметря');
        break;
      case 'KeyY':
        setMessage('Ви обрали вміння літати');
        break;
      default:
        setMessage('Ви нічого не обрали');
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleIconClick);

    return () => {
      document.removeEventListener('keydown', handleIconClick);
    };
  });

  return (
    <>
      <div className="battle">
        <h1 className="battle__starter">Battle</h1>
        <h2 className="message">{message}</h2>
        <div role="button" tabIndex={0} className="battle__player">
          <img
            src={selectedPlayer.playerImage}
            alt="1 Player"
            width="300"
            height="300"
            className="table__before"
          />
        </div>
        <div className="battle__icons">
          <img src={icon} alt="Icon 1" role="presentation" />
          <img src={icon} alt="Icon 2" role="presentation" />
          <img src={icon} alt="Icon 3" role="presentation" />
          <img src={icon} alt="Icon 4" role="presentation" />
          <img src={icon} alt="Icon 5" role="presentation" />
          <img src={icon} alt="Icon 6" role="presentation" />
        </div>
      </div>
    </>
  );
};
