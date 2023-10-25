import './App.css';
import { Canvas, painters } from 'headbreaker';
import { useEffect, useRef, useState } from 'react';

const puzzleSize = 700;
const pieceQuantity = 4;
const pieceSize = puzzleSize / ( pieceQuantity * 1.75 );

const puzzleImages = [
  {
    name: "Face of ancient daemon",
    thumb: "images/photorealistic_face_of_ancient_daemon_thumb_200px.png",
    path: "images/photorealistic_face_of_ancient_daemon_700px.png",
    url: "https://www.artstation.com/artwork/8lQYV",
  },
  {
    name: "Human eye",
    thumb: "images/human_eye_thumb_200px.png",
    path: "images/human_eye_700px.png",
    url: "https://www.artstation.com/artwork/8lQYV",
  },
  {
    name: "bug_face",
    thumb: "images/bug_face_thumb_200px.png",
    path: "images/bug_face_700px.png",
    url: "https://www.artstation.com/artwork/8lQYV",  
  }
]

function ShowPuzzle({ id, currentImage }) {
  const puzzleRef = useRef(null)
  useEffect(() => {
    const container = document.getElementById('gameroot').shadowRoot.getElementById('puzzle');
    let puzzleImage = new Image();
    puzzleImage.src = '/' + currentImage;
    
    puzzleImage.onload = () => {

        const canvas = new Canvas(container, {
            width: puzzleSize * 1.33,
            height: puzzleSize,
            pieceSize: pieceSize,
            proximity: pieceSize / 6,
            borderFill: pieceSize / 10,
            strokeWidth: 0,
            lineSoftness: 0.1,
            image: puzzleImage,
            painter: new painters.Konva() // <-- this is important. See https://github.com/flbulgarelli/headbreaker/issues/51
        });
    
        canvas.adjustImagesToPuzzleHeight();
        canvas.autogenerate({
          horizontalPiecesCount: pieceQuantity,
          verticalPiecesCount: pieceQuantity
        });
    
        canvas.shuffleGrid();
        canvas.draw();

        document.addEventListener('keypress', (event) => {
          if(event.key === 's') {
            canvas.solve();
            canvas.redraw();
          };
        });
        
    }
  }, [currentImage])

  return <div ref={puzzleRef} id={id}></div>
}

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

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [appHidden, setAppHidden] = useState(false);

  const changeImage = () => {
    setCurrentImageIndex(-1);
  };

  const toggleAppVisibility = () => {
    setAppHidden(!appHidden);
  };
  
  return (
    <>
      {!appHidden && (
        <div className="App">
          <button type="button" onClick={toggleAppVisibility}>
            Hide App
          </button>
          {currentImageIndex === -1 ? (
            <ShowGallery puzzleImages={puzzleImages} setCurrentImageIndex={setCurrentImageIndex} />
          ) : (
            <div>
              <button type="button" onClick={changeImage}>
                To Gallery
              </button>
              <ShowPuzzle id="puzzle" currentImage={puzzleImages[currentImageIndex].path} />
            </div>
          )}
        </div>
      )}
      {appHidden && (
        <button type="button" onClick={toggleAppVisibility}>
          Show App
        </button>
      )}
    </>
  );
}

export default App;