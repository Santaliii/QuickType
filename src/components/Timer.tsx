import { clear } from "console";
import React, { useEffect, useRef, useState } from "react";
import { getNetWPM, getNumOfCorrectCharacters } from "../helpers/WPMHelper"
import { arrayOfArrayOfWords } from "../types/types";

interface ITimerProps {
  currWordArray: arrayOfArrayOfWords,
  testFinished: boolean
}

const Timer: React.FC<ITimerProps> = ({currWordArray, testFinished}) => {

  const [currentWPM, setCurrentWPM] = useState<number>(0)
  let interval = useRef(0)

  useEffect(() => {
    
    let timeAtTestStart = new Date()
    if(!testFinished){
        interval.current = window.setInterval(() => {
        setCurrentWPM(  getNetWPM(  ((new Date().getTime() - timeAtTestStart.getTime()) / 1000), currWordArray  )  )
      }, 700)
    }

    return () => {
      clearInterval(interval.current)
    }
    
  }, [])

  return(
    <div className="timer">
      <h1>WPM: {currentWPM}</h1>
    </div>
  )

}

export default Timer
