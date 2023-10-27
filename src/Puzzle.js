import './App.css';
import { Canvas, painters, Puzzle } from 'headbreaker';
import { useEffect, useRef, useState } from 'react';
import * as PuzzleUtils from './PuzzleUtils';
import PrizeButton from './PrizeButton';

const puzzleSize = 700;
const pieceQuantity = 3;
const pieceSize = puzzleSize / ( pieceQuantity * 1.75 );

const puzzleImages = [
  {
    name: "Face of ancient daemon",
    thumb: "images/photorealistic_face_of_ancient_daemon_thumb_200px.png",
    path: "images/photorealistic_face_of_ancient_daemon_700px.png",
    HDURL: "https://storage.googleapis.com/jigsaw-puzzle-images/photorealistic_face_of_ancient_daemon_2048.png",
  },
  {
    name: "Human eye",
    thumb: "images/human_eye_thumb_200px.png",
    path: "images/human_eye_700px.png",
    HDURL: "https://www.artstation.com/artwork/8lQYV",
  },
  {
    name: "bug_face",
    thumb: "images/bug_face_thumb_200px.png",
    path: "images/bug_face_700px.png",
    HDURL: "https://www.artstation.com/artwork/8lQYV",  
  }
]

function ShowGallery(props) {
  return (
    <div className="gallery">
      {props.puzzleImages.map((image, index) => (
        <div className="gallery-item" key={index}>
          <img src={image.thumb} alt={image.name} />
          <button type="button" onClick={() => props.setCurrentImageIndex(index)}>
            Unpuzzle
          </button>
          {image.name}
        </div>
      ))}
    </div>
  );
}

function Puzlle() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [appHidden, setAppHidden] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const showGallery = () => {
    dumpPuzzle();
    setCurrentImageIndex(-1);
  };

  const hideApp = () => {
    setAppHidden(true);
    if(canvas !== undefined) dumpPuzzle();
  };

  const showApp = () => {
    setAppHidden(false);
  };

  const dumpPuzzle = () => {
    let dump = JSON.stringify(canvas.puzzle.export({ compact: true }));
    let key = PuzzleUtils.getPuzzleDumpName(canvas.imageMetadata.content.currentSrc);
    
    localStorage.setItem(key, dump);
  }

  const clearPuzzleDumps = () => {
    for (let i = 0; i < puzzleImages.length; i++){
      let keyDump = PuzzleUtils.getPuzzleDumpName(puzzleImages[i].path);
      let keySolved = PuzzleUtils.getPuzzleSolvedFlagName(puzzleImages[i].path);
      try {
        localStorage.removeItem(keyDump);
        localStorage.removeItem(keySolved);
      } catch (error) {
        console.log(error);
      }
    }
  }

  let canvas;
  function ShowPuzzle({ id, currentImage }) {
    const puzzleRef = useRef(null)
    
    useEffect(() => {
      const container = document.getElementById('gameroot').shadowRoot.getElementById('puzzle');
      let puzzleImage = new Image();
      puzzleImage.src = '/' + currentImage;

      try {
        setIsSolved(localStorage.getItem(PuzzleUtils.getPuzzleSolvedFlagName(currentImage)));
      } catch (error) {
        setIsSolved(false);
      }

      puzzleImage.onload = () => {

        canvas = new Canvas(container, {
          width: puzzleSize * 1.33,
          height: puzzleSize,
          pieceSize: pieceSize,
          proximity: pieceSize / 6,
          borderFill: pieceSize / 10,
          strokeWidth: 0,
          lineSoftness: 0.1,
          image: puzzleImage,
          fixed: true,
          painter: new painters.Konva() // <-- this is important. See https://github.com/flbulgarelli/headbreaker/issues/51
        });

        canvas.adjustImagesToPuzzleHeight();
        canvas.autogenerate({
          horizontalPiecesCount: pieceQuantity,
          verticalPiecesCount: pieceQuantity
        });

        //Try to load puzzle dump from local storage
        let key = PuzzleUtils.getPuzzleDumpName(canvas.imageMetadata.content.currentSrc);
        let dump = localStorage.getItem(key);
        if (dump) {
          canvas.clear();
          canvas.renderPuzzle(Puzzle.import(JSON.parse(dump)));
        } else {
          canvas.shuffleGrid();
        }

        canvas.draw();

        canvas.attachSolvedValidator();
        canvas.onValid(() => {
          if (isSolved) return;
          //Dump puzzle to local storage
          dumpPuzzle();
          localStorage.setItem(PuzzleUtils.getPuzzleSolvedFlagName(canvas.imageMetadata.content.currentSrc), true);
          setIsSolved(true);
          console.log('Solved!');
        })

        document.addEventListener('keypress', (event) => {
          if (event.key === 's') {
            canvas.solve();
            canvas.redraw();
          };
        });

      }
    }, [currentImage])

    return <div ref={puzzleRef} id={id}></div>
  }

  return (
    <>
      {!appHidden && (
        <div className="App">
          <button type="button" onClick={hideApp}>
            Hide App
          </button>
          {currentImageIndex === -1 ? (
            <div>
              <button type="button" onClick={clearPuzzleDumps}>
                ShuffleAll
              </button>
              <ShowGallery puzzleImages={puzzleImages} setCurrentImageIndex={setCurrentImageIndex} />
            </div>
          ) : (
            <div>
              <button type="button" onClick={showGallery}>
                To Gallery
              </button>
              <PrizeButton solved={isSolved} HDURL={puzzleImages[currentImageIndex].HDURL}/>
              <ShowPuzzle id="puzzle" currentImage={puzzleImages[currentImageIndex].path} />
            </div>
          )}
        </div>
      )}
      {appHidden && (
        <button type="button" onClick={showApp}>
          Show App
        </button>
      )}
    </>
  );
}

export default Puzlle;