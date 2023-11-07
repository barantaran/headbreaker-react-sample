import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// eslint-disable-next-line import/no-webpack-loader-syntax
import styles from '!raw-loader!./App.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import gridCSS from '!raw-loader!bootstrap-4-grid/css/grid.min.css';
import * as PuzzleUtils from './PuzzleUtils';
import { PuzzlesContext } from './Contexts';
import { useContext } from 'react'


function PuzzlesComponent() {
  const Puzzles = useContext(PuzzlesContext);

  const clearPuzzleDumps = () => {
    for (let i = 0; i < Puzzles.length; i++) {
      let keyDump = PuzzleUtils.getPuzzleDumpName(Puzzles[i].path);
      let keySolved = PuzzleUtils.getPuzzleSolvedFlagName(Puzzles[i].path);
      try {
        localStorage.removeItem(keyDump);
        localStorage.removeItem(keySolved);
      } catch (error) {
        console.log(error);
      }
    }
    // Reload page
    window.location.reload();
  }

// Assign clearPuzzleDumps to #shuffle button click
document.getElementById('shuffle').addEventListener('click', clearPuzzleDumps);

  return (
    <>
      <style>{styles}</style>
      <style>{gridCSS}</style>
      <div className='container'>
        <div className='row'>
          <div id="puzzle" className='col'></div>
        </div>
        <App />
      </div>
    </>
  );
}

// import reportWebVitals from './reportWebVitals';
ReactDOM.createRoot(
  document
    .getElementById('gameroot')
    .attachShadow({ mode: "open" }))
    .render(<PuzzlesComponent />);
