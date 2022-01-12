import React, { useState } from "react";


const wordOptions = [5, 10, 25, 50]

interface IWordOptionsProps {
  updateNumOfWords: (numOfWords: number) => void
}


const WordOptions: React.FC<IWordOptionsProps> = ({updateNumOfWords}) => {

  const [showWords, setShowWords] = useState<boolean>(false)

  return(
    <li>
      <span onClick={() => setShowWords(!showWords)}>words</span>
      <div className="word-options">
        {showWords ? wordOptions.map((wordOption, index) => <div key={index} onClick={() => updateNumOfWords(wordOption)}>{wordOption}</div> ) : ''}
      </div>
    </li>
  )
} 

export default WordOptions