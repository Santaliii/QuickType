import React, { useEffect, useState } from "react";
import { getNetWPM } from "../helpers/WPMHelper"
import { arrayOfArrayOfWords } from "../types/types";

interface ITimerProps {
  finishedWordArray: arrayOfArrayOfWords,
}

const Timer: React.FC<ITimerProps> = ({finishedWordArray}) => {

  const [currentWPM, setCurrentWPM] = useState<number>(0)

  useEffect(() => {
    window.addEventListener("keypress", () => {
      let timeAtTestStart = new Date()
      const intervalID = setInterval(() => {
        setCurrentWPM(  getNetWPM(  ((new Date().getTime() - timeAtTestStart.getTime()) / 1000), finishedWordArray  )  )
        console.log("a")
      }, 700)
    }, {once: true})
  }, [])

  return(
    <div className="timer">
      <h1>{currentWPM}</h1>
    </div>
  )

}

export default Timer
