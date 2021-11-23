import React, { useState } from 'react';
import Header from './components/Header'
import Typer from './components/TypingTest';
import Timer from './components/Timer'
import { getWordArray, wordArray } from "./util/WordArray"
import { arrayOfArrayOfWords } from "./types/types";
import Results from './components/Results';



const App: React.FC = () => {

  const [currWordArray, setCurrWordArray] = useState<arrayOfArrayOfWords>(wordArray)
  const [timeToFinish, setTimeToFinish] = useState<number>(0)
  const [testFinished, setTestFinished] = useState<boolean>(false)
  const [testStarted, setTestStarted] = useState<boolean>(false)

  const initializeNewTest = () => {
    let newWordArray = getWordArray()
    setCurrWordArray([...newWordArray])
  }

  const updateTestStart =  () => {
    setTestStarted(true)
  }

  const updateWordArray = (updatedWordArray: arrayOfArrayOfWords) => {
    setCurrWordArray(updatedWordArray)
  }

  const updateFinish = (timeToFinish: number) => {
    setTimeToFinish(timeToFinish)
    console.log(timeToFinish)
    setTestFinished(true)
    setTestStarted(false)
  }

  return (
    <div className="container">
      <div className="mid-container">
      <Header />
      {testStarted ? <Timer finishedWordArray={currWordArray} /> : "" }
      {testFinished ? 
        <Results timeToFinishTest={timeToFinish}
          finishedWordArray={currWordArray} /> 
          :
        <Typer 
          currArrayOfArrayOfWords={currWordArray} 
            updateTestStart={updateTestStart}
              updateWordArray={updateWordArray} 
                updateFinish={updateFinish}
                  initializeNewTest={initializeNewTest}/>
      }
      </div>
    </div>
  );
}

export default App;
