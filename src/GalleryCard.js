
export const GalleryCard = ({ title, image, description, link }) => {
    return (
            <a href="https://www.mythrillfiction.com/the-dark-rider">
                <div className="card">
                    <div className="wrapper">
                        <img src="images\photorealistic_hell_landsape_200px.png" className="cover-image" alt="Mythrill" />
                        {/* <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" className="cover-image" alt="Mythrill" /> */}
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png" className="title" alt="Mythrill" />
                    <img src="images/photorealistic_face_of_ancient_daemon_character_200px.png" className="character" alt="Mythrill" />
                    {/* <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" className="character" alt="Mythrill" /> */}
                </div>
            </a>
    );
};