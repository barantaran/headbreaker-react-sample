
export const GalleryCard = ({ title, thumbBg, thumbChar, titleImage, image, HRlink }) => {
    return (
                <div className="card">
                    <div className="wrapper">
                        <img src={thumbBg} className="cover-image" alt="Mythrill" />
                    </div>
                    <img src={titleImage} className="title" alt="Mythrill" />
                    <img src={thumbChar} className="character" alt="Mythrill" />
                </div>
    );
};