
export const GalleryCard = ({ title, image, description, link }) => {
    return (
        <div className='gallery-card'>
            <a href="https://www.mythrillfiction.com/the-dark-rider">
                <div className="card">
                    <div className="wrapper">
                        <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" className="cover-image" alt="Mythrill" />
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png" className="title" alt="Mythrill" />
                    <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" className="character" alt="Mythrill" />
                </div>
            </a>

        </div>
    );
};