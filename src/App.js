import React, { useContext, useEffect } from 'react'
import PuzzleGame from './PuzzleGame'
import Gallery from './Gallery'
import { PuzzlesContext } from './Contexts';
import * as PuzzleUtils from './PuzzleUtils';


export default function App() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = React.useState(0);
  const [appHidden, setAppHidden] = React.useState(false);
  const [shuffle, setShuffle] = React.useState(false);
  const Puzzles = useContext(PuzzlesContext);

  const setPuzzleIndex = (index) => {
    setCurrentPuzzleIndex(index);
  }

  const clearPuzzleDumps = () => {
    for (let i = 0; i < Puzzles.length; i++){
      let keyDump = PuzzleUtils.getPuzzleDumpName(Puzzles[i].path);
      let keySolved = PuzzleUtils.getPuzzleSolvedFlagName(Puzzles[i].path);
      try {
        localStorage.removeItem(keyDump);
        localStorage.removeItem(keySolved);
      } catch (error) {
        console.log(error);
      }
    }
    //Shuffle the current puzzle
    setShuffle(true);
  }

  useEffect(() => {
    setShuffle(false);
  } , [shuffle]);

  return (
    <div>
      <button onClick={() => {setAppHidden(!appHidden)}}>Toggle</button>
      <button onClick={() =>clearPuzzleDumps()}>Shuffle All</button>
      <PuzzleGame id="puzzle" currentPuzzle={currentPuzzleIndex} appHidden={appHidden} shuffle={shuffle}/>
      {appHidden ? null : (
        <>
          <Gallery setPuzzleIndex={setPuzzleIndex}/>
        </>
      )}
    </div>
  )
}