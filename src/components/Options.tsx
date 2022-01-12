import React, { useState } from "react";
import WordOptions from "./WordOptions";

interface IOptionsProps {
  updateNumOfWords: (numOfWords: number) => void
}

const Options: React.FC<IOptionsProps> = ({updateNumOfWords}) => {
  

  return(
    <div className="options-wrapper">
        <ul className="options">
          <WordOptions updateNumOfWords={updateNumOfWords}/>
        </ul>
    </div>
  )
}

export default Options