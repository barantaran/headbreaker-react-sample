import { useContext } from "react";
import { PuzzlesContext } from "./Contexts";
import { GalleryCard } from "./GalleryCard";

function Gallery({ setPuzzleIndex }) {
    const Puzzles = useContext(PuzzlesContext);

    return (
            Puzzles.map((puzzle, index) => (
                // <div className="gallery-item" key={index}>
                //     <img src={puzzle.thumb} alt={puzzle.name} />
                //     <button type="button" onClick={()=>setPuzzleIndex(index)}>
                //         Unpuzzle
                //     </button>
                //     {puzzle.name}
                // </div>
                <div className="col">
                    <GalleryCard key={index} title={puzzle.name} image={puzzle.thumb} description={puzzle.description} link={puzzle.path} setPuzzleIndex={setPuzzleIndex}/>
                </div>
            ))
    );
}

export default Gallery;