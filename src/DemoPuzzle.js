import { Canvas, painters } from 'headbreaker';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const puzzleSize = 700;
const pieceQuantity = 4;
const pieceSize = puzzleSize / ( pieceQuantity * 1.55 );

function DemoPuzzle({ id }) {
  const puzzleRef = useRef(null)

  useEffect(() => {
    let puzzleImage = new Image();
    puzzleImage.src = '/photorealistic_face_of_ancient_daemon_700px.png';
    
    puzzleImage.onload = () => {

        const puzzle = puzzleRef.current
        const canvas = new Canvas(puzzle.id, {
            width: puzzleSize,
            height: puzzleSize,
            pieceSize: pieceSize,
            proximity: pieceSize / 6,
            borderFill: pieceSize / 10,
            strokeColor: '#282c34',
            strokeWidth: 3,
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
        }, false);
        
    }
  }, [])

  return <div ref={puzzleRef} id={id}></div>
}

export default function Home() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  }

  return (
    <main>
      <DemoPuzzle id="puzzle" />
      <button onClick={handleClose}>Close</button>
    </main>
  )
}