import React, { useEffect, useState } from 'react';
import './App.scss';
import { Battle } from './Components/Battle';
import { Main } from './Components/Main';

export const App: React.FC = () => {
  const [showComponents, setShowComponents] = useState(false);
  const [isReady, setIsReady] = useState(false);

  interface SelectedPlayerState {
    playerId: number | null;
    playerImage: string | undefined;
  }

  const [selectedPlayer, setSelectedPlayer] = useState<SelectedPlayerState>({
    playerId: null,
    playerImage: undefined,
  });

  useEffect(() => {
    setTimeout(() => {
      if (isReady) {
        setShowComponents(true);
        setTimeout(() => {
          setShowComponents(false);
        }, 4000);
      }
    }, 2000);
  }, [isReady]);

  return (
    <>
      {!showComponents && (
        <Main
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          setIsReady={setIsReady}
        />
      )}
      {showComponents && (
        <Battle selectedPlayer={selectedPlayer} />
      )}
    </>
  );
};
