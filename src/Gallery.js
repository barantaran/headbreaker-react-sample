import { useContext } from "react";
import { PuzzlesContext } from "./Contexts";
import { GalleryCard } from "./GalleryCard";

function Gallery({ setPuzzleIndex }) {
    const Puzzles = useContext(PuzzlesContext);

    return (
            Puzzles.map((puzzle, index) => (
                <div className="col" onClick={()=>setPuzzleIndex(index)}>
                    <GalleryCard key={index} title={puzzle.name} image={puzzle.thumb} description={puzzle.description} link={puzzle.path}/>
                </div>
            ))
    );
}

export default Gallery;