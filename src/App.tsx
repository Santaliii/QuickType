import React, { useEffect, useState } from 'react';
import Header from './components/Header'
import Typer from './components/TypingTest';
import { getWordArray } from "./util/WordArray"
import { arrayOfArrayOfWords } from "./types/types";
import Results from './components/Results';


const App: React.FC = () => {

  const [currWordArray, setCurrWordArray] = useState<arrayOfArrayOfWords>(getWordArray(20))
  const [timeToFinish, setTimeToFinish] = useState<number>(0)
  const [testFinished, setTestFinished] = useState<boolean>(false)
  const [testStarted, setTestStarted] = useState<boolean>(false)
  const [typerInstanceNumber, setTyperInstanceNumber] = useState<number>(1)
  const [numOfWords, setNumOfWords] = useState<number>(20)

  useEffect(() => {
    initializeNewTest()
  }, [numOfWords])

  const initializeNewTest = () => {
    setTyperInstanceNumber(typerInstanceNumber + 1)
    setCurrWordArray(getWordArray(numOfWords))
    setTestFinished(false)
    setTestStarted(false)
  }
 
  const updateNumOfWords = (numOfWords: number) => {
    setNumOfWords(numOfWords)
    setTestStarted(false)
  }

  const updateTestStart =  (testStart: boolean) => setTestStarted(testStart)
  

  const updateWordArray = (updatedWordArray: arrayOfArrayOfWords) => setCurrWordArray(updatedWordArray)
  

  const updateFinish = (timeToFinish: number) => {
    setTimeToFinish(timeToFinish)
    setTestFinished(true)
    setTestStarted(false)
  }

  return (
    <div className="container">
      <div className="mid-container">
      <Header updateNumOfWords={updateNumOfWords}/>
      {testFinished ? 
        <Results  initializeNewTest={initializeNewTest} timeToFinishTest={timeToFinish}
          finishedWordArray={currWordArray} /> 
          :
        <Typer key={typerInstanceNumber}
          currArrayOfArrayOfWords={currWordArray} 
            updateTestStart={updateTestStart}
              updateWordArray={updateWordArray} 
                updateFinish={updateFinish}
                  initializeNewTest={initializeNewTest}
                    testFinished={testFinished} 
                      testStarted={testStarted}/>
      }
      </div>
    </div>
  );
}

export default App;
