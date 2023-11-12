import React from 'react';

function PrizeButton(props) {
  const className = 'button-prize bounce';
  
  const getPrize = (HRURL) => {
    window.open(HRURL);
  }

  if (props.solved) {
    return (
      <button className={className} type="button" onClick={()=>getPrize(props.HRURL)}></button>
    );
  } else {
    return null;
  }
}

export default PrizeButton;