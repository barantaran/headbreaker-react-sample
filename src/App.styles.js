const styles = `


.App{
    background-color: black;
    border-radius: 20px;
    height: 700px;
    width: 941px;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    z-index: 10000;
}
.img-solved-cnt {
    width: 50%;
    margin: auto;
}

.img-solved {
    width: 100%;
}

.hidden {
    display: none;
}

.gallery-card {
    float: left;
}

:root {
    --card-height: 300px;
    --card-width: calc(var(--card-height) / 1.5);
  }
  * {
    box-sizing: border-box;
  }
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #191c29;
  }
  .card {
    width: var(--card-width);
    height: var(--card-height);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0 36px;
    perspective: 2500px;
    margin: 0 50px;
  }
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .wrapper {
    transition: all 0.5s;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
  
  .card:hover .wrapper {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  }
  
  .wrapper::before,
  .wrapper::after {
    content: "";
    opacity: 0;
    width: 100%;
    height: 80px;
    transition: all 0.5s;
    position: absolute;
    left: 0;
  }
  .wrapper::before {
    top: 0;
    height: 100%;
    background-image: linear-gradient(
      to top,
      transparent 46%,
      rgba(12, 13, 19, 0.5) 68%,
      rgba(12, 13, 19) 97%
    );
  }
  .wrapper::after {
    bottom: 0;
    opacity: 1;
    background-image: linear-gradient(
      to bottom,
      transparent 46%,
      rgba(12, 13, 19, 0.5) 68%,
      rgba(12, 13, 19) 97%
    );
  }
  
  .card:hover .wrapper::before,
  .wrapper::after {
    opacity: 1;
  }
  
  .card:hover .wrapper::after {
    height: 120px;
  }
  .title {
    width: 100%;
    transition: transform 0.5s;
  }
  .card:hover .title {
    transform: translate3d(0%, -50px, 100px);
  }
  
  .character {
    width: 100%;
    opacity: 0;
    transition: all 0.5s;
    position: absolute;
    z-index: -1;
  }
  
  .card:hover .character {
    opacity: 1;
    transform: translate3d(0%, -30%, 100px);
  }
  
  #puzzle {
    background-color: black;
  }
`

export default styles;