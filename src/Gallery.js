import { useContext } from "react";
import { PuzzlesContext } from "./Contexts";
import { GalleryCard } from "./GalleryCard";

function Gallery({ setPuzzleIndex }) {
    const Puzzles = useContext(PuzzlesContext);

    return (
            Puzzles.map((puzzle, index) => (
                <div className="col" onClick={()=>setPuzzleIndex(index)}>
                    <GalleryCard 
                    key={index} 
                    title={puzzle.name} 
                    thumbBg={puzzle.galleryBg} 
                    thumbChar={puzzle.galleryChar} 
                    titleImage={puzzle.titleImage}
                    image={puzzle.image} 
                    HRlink={puzzle.HRURL}/>
                </div>
            ))
    );
}

export default Gallery;