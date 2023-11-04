import { createContext } from "react";

export const PuzzlesContext = createContext(
    [
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
);