import React from 'react';

function PrizeButton(props) {
  const className = 'button-prize bounce';
  
  const getPrize = (HDURL) => {
    window.open(HDURL);
    console.log(HDURL);
  }

  if (props.solved) {
    return (
      <button className={className} type="button" onClick={()=>getPrize(props.HDURL)}></button>
    );
  } else {
    return null;
  }
}

export default PrizeButton;