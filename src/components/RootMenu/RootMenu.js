import React from 'react';
import styles from './RootMenu.module.css';
import { NavLink } from 'react-router-dom';

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

const RootMenu = () => (
  <div className={styles.RootMenu}>
    {puzzleImages.map((puzzleImage, index) => (
      <div key={index}>
      <NavLink 
        key={index} 
        to="/OnePuzzle" state={{ currentImage: puzzleImage.path }}>
        <img
          src={puzzleImage.thumb}
          alt={puzzleImage.name}
          title={puzzleImage.name}
        />
        <br />
        {puzzleImage.name}
      </NavLink>
      </div>
    ))}
  </div>
);

export default RootMenu;
