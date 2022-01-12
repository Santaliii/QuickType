import React from "react";
import { getNetWPM } from "../helpers/WPMHelper"
import { IWPMProps as IResultsProps } from "../interfaces/commonProps"

const Results: React.FC<IResultsProps> = ({finishedWordArray, timeToFinishTest, initializeNewTest}) => {

  
  return(
    <div className="center-of-mid results-container">
      <div className="wpm-container">
        <h1>WPM <span style={{color: "orange"}}>{getNetWPM(timeToFinishTest, finishedWordArray)}</span> </h1>
      </div>
      <button className="new-test-btn" onClick={initializeNewTest} >Go again?</button>
    </div>
  )

  
}

export default Results