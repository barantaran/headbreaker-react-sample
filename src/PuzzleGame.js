import React from 'react';
import { Canvas, painters, Puzzle } from 'headbreaker';
import { useContext, useEffect } from 'react';
import * as PuzzleUtils from './PuzzleUtils';
import { PuzzlesContext } from './Contexts';
import PrizeButton from './PrizeButton';

const puzzleSize = 700;
const pieceQuantity = 3;
const pieceSize = puzzleSize / (pieceQuantity * 1.75);
let canvas;

const dumpPuzzle = (canvas) => {
  let dump = JSON.stringify(canvas.puzzle.export({ compact: true }));
  let key = PuzzleUtils.getPuzzleDumpName(canvas.imageMetadata.content.currentSrc);

  localStorage.setItem(key, dump);
}

function PuzzleGame({ id, currentPuzzle, appHidden, shuffle }) {
  const [isSolved, setIsSolved] = React.useState(false);
  const Puzzles = useContext(PuzzlesContext);
  let container = document.getElementById('gameroot').shadowRoot.getElementById(id);

  if(canvas != null )dumpPuzzle(canvas);
  
  useEffect(() => {
    let key = PuzzleUtils.getPuzzleSolvedFlagName(Puzzles[currentPuzzle].path);
    let solved = localStorage.getItem(key);
    if (solved) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  }, [currentPuzzle, Puzzles]);

  if(appHidden) {
    if (container !== null) {
      container.innerHTML = '';
    }
    return (
      <>
      </>
    );
  }
  let puzzleImage = new Image();
  puzzleImage.src = '/' + Puzzles[currentPuzzle].path;

  puzzleImage.onload = () => {

    // if (container === null) {
    //   let wrapper = document.createElement('div');
    //   wrapper.setAttribute('id', id);
    //   container = document.getElementById('gameroot')
    //   container = container.shadowRoot.insertHTML += '<div id='+id+'></div>';//appendChild(wrapper);
    // }

    container = document.getElementById('gameroot').shadowRoot.querySelector('#'+id);
    canvas = new Canvas(container, {
      width: 1135,
      height: 650,
      pieceSize: pieceSize,
      proximity: pieceSize / 6,
      borderFill: pieceSize / 10,
      strokeWidth: 5,
      lineSoftness: 0.1,
      strokeColor: 'black',
      image: puzzleImage,
      fixed: true,
      preventOffstageDrag: true,
      painter: new painters.Konva() // <-- this is important. See https://github.com/flbulgarelli/headbreaker/issues/51
    });

    canvas.adjustImagesToPuzzleHeight();
    canvas.autogenerate({
      horizontalPiecesCount: pieceQuantity,
      verticalPiecesCount: pieceQuantity
    });

    canvas.onConnect((_piece, figure, _target, targetFigure) => {
      // play sound
      // audio.play();
  
      // paint borders on click
      // of conecting and conected figures
      figure.shape.stroke('darkred');
      targetFigure.shape.stroke('darkred');
      canvas.redraw();
  
      setTimeout(() => {
        // restore border colors
        // later
        figure.shape.stroke('black');
        targetFigure.shape.stroke('black');
        canvas.redraw();
      }, 100);
    });

    //Try to load puzzle dump from local storage
    let key = PuzzleUtils.getPuzzleDumpName(canvas.imageMetadata.content.currentSrc);
    let dump = localStorage.getItem(key);
    if (dump && !shuffle) {
      canvas.clear();
      canvas.renderPuzzle(Puzzle.import(JSON.parse(dump)));
      canvas.draw();
      //Fix double canvas bug
      document.querySelector("#gameroot").shadowRoot.querySelector("#puzzle > div > canvas:nth-child(1)").remove();
    } else {
      canvas.shuffleGrid();
      canvas.draw();
    }

    canvas.attachSolvedValidator();
    canvas.onValid(() => {
      //Dump puzzle to local storage
      dumpPuzzle(canvas);
      localStorage.setItem(PuzzleUtils.getPuzzleSolvedFlagName(canvas.imageMetadata.content.currentSrc), true);
      setIsSolved(true);
    })

    //     document.addEventListener('keypress', (event) => {
    //       if (event.key === 's') {
    //         canvas.solve();
    //         canvas.redraw();
    //       };
    //     });
  }

  return (
      <PrizeButton solved={isSolved} HDURL={Puzzles[currentPuzzle].HDURL}/>
  );
}

export default PuzzleGame;