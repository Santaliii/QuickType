import React from "react";
import { getGrossWPM, getNetWPM } from "../helpers/WPMHelper"
import { IWPMProps as IResultsProps } from "../interfaces/commonProps"

const Results: React.FC<IResultsProps> = ({finishedWordArray, timeToFinishTest}) => {

  
  return(
    <div className="center-of-mid results-container">
      <h1>Your WPM is {getNetWPM(timeToFinishTest, finishedWordArray)}</h1>
      <h1>Raw - {getGrossWPM(timeToFinishTest, finishedWordArray)}</h1>
    </div>
  )
}

export default Results