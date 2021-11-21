import React from "react";


interface ILetterProps {
  letterText: string,
  letterState: string
}

const Letter: React.FC<ILetterProps> = ({letterText, letterState}) => {

  return(
    <p className={`letter ${letterText === " " ? letterState === "active" ? letterState : "" : letterState}`} >
      {letterText === " " ? <>&nbsp;</> : letterText}
    </p>
  )
}

export default Letter