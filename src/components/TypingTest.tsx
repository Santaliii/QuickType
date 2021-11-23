import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import letterStack from "../classes/LetterStack";
import Letter from "./Letter";
import { arrayOfArrayOfWords } from "../types/types";
import {  FaRedoAlt } from "react-icons/fa"


interface ITypingTestProps {
  currArrayOfArrayOfWords: {
    letterText: string,
    state: string,
    isEndOfWord: boolean
  }[][],
  updateWordArray: (currArray: arrayOfArrayOfWords) => void,
  updateFinish: (timeToFinish: number) => void,
  initializeNewTest: () => void,
  updateTestStart: () => void
}



const TypingTest: React.FC<ITypingTestProps> = ({currArrayOfArrayOfWords, updateWordArray, updateFinish, initializeNewTest, updateTestStart}) => {

  /* char stack that keeps track of each letter the user inputs.
  Pushes each pressed letter onto the stack then compares it to the correct input
  based on currLetterPosition */
  let currLetterStack = new letterStack<string>()
  let timeAtTestStart = new Date('')
  let inputRef = useRef() as MutableRefObject<HTMLDivElement>
  const [restart, setRestart] = useState<boolean>(false)
  /* Tracks the position of the word and letter that is next expected to be input from the user.
  Is either incremented/decremented based on the user's input */
  let currLetterPosition = useRef(0)
  let currWordPosition = useRef(0)
  // Adds event listeners each time we restart,
  useEffect(() => {
    
    const setupListeners = () => {
      window.addEventListener("keydown", onType)
      window.addEventListener("keydown", onFirstType, {once: true})
    }
    setupListeners()

    return () => {
      window.removeEventListener("keydown", onType)
      
    }
  }, [restart])

  const onFirstType = () => {timeAtTestStart = new Date()
  updateTestStart()}

  // Event listener to listen for any keypress that occurs, including ones that do not produce printable-characters
  const onType = (event: any) => {
    
    if( (event.keyCode < 32 || (event.keyCode > 111 && event.keyCode < 124) || (event.keyCode > 126 && event.keyCode < 173)) && event.key !== "Backspace")
      return
    // Pushes the letter that was input by the user to the currLetterStack, so it can be compared to the correct array
    currLetterStack.push(event.key)
    if(event.key === 'Backspace'){
      if(currWordPosition.current === 0 && currLetterPosition.current === 0)
        return
      
      getCurrentLetter().state === "incorrectTemp" ? getCurrentLetter() : setLetterState("")
      if(currLetterPosition.current === 0){
        currWordPosition.current--
        currLetterPosition.current = getCurrentWord().length
        console.log(currLetterPosition.current);
      }
      currLetterPosition.current = (currLetterPosition.current === 0) ? currLetterPosition.current : currLetterPosition.current - 1

      if(getCurrentLetter().state === "incorrectTemp"){
        getCurrentWord().splice(currLetterPosition.current, 1)
        
      }

      getCurrentLetter().state === "incorrectTemp" ? getCurrentLetter() : setLetterState("active")
      // Removes the letter that is to be erased from the currLetterStack
      currLetterStack.pop()
      updateWordArray([...currArrayOfArrayOfWords])
      return
    }
    else if(currLetterStack.peek() === getCurrentLetter().letterText){
      setLetterState("correct")
      updateWordArray([...currArrayOfArrayOfWords])
    }
    else{
      if(getCurrentLetter().letterText === " "){
        currArrayOfArrayOfWords[currWordPosition.current].unshift({
          letterText: event.key,
           state: "incorrectTemp",
            isEndOfWord: false
          })
      }
      else{
        setLetterState("incorrect")
      }
      updateWordArray([...currArrayOfArrayOfWords])
    }
    
    
    if(getCurrentLetter().isEndOfWord){
      // If we're not on the last word
      if(currArrayOfArrayOfWords.length - 1 !== currWordPosition.current){
        currWordPosition.current++
        currLetterPosition.current = 0
      }
      // If we are, do not jump to the last word.
      else{
        // This increment exists so we can identify if we are on the last letter of the last word.
        currLetterPosition.current++
      }
    }
    else{
      currLetterPosition.current++
    }

    // If the user is on the last word
    if(currArrayOfArrayOfWords.length - 1 === currWordPosition.current){
      // and they have just input the last letter
      if(getCurrentWord().length === currLetterPosition.current){
        /* This line might seem redundant since we are removing the event listener on unmount through useEffect.
           However, this actually addresses an edge case where if the user is giving keyboard input extremely fast,
           they could access onType between the time the test ends, until it is unmounted, thus throwing an error. */
        window.removeEventListener("keydown", onType)
        const timeToFinishTest =  ((new Date().getTime() - timeAtTestStart.getTime()) / 1000)
        // Updates 'finish' state in parent component
        updateFinish(timeToFinishTest)
      }
      else{
        setLetterState("active")
        updateWordArray([...currArrayOfArrayOfWords])
      }
    }
    else{
        setLetterState("active")
        updateWordArray([...currArrayOfArrayOfWords])
    }
    
    
  }

  const setLetterState = (state: string) => {
    currArrayOfArrayOfWords[currWordPosition.current][currLetterPosition.current].state = state
  }

  const getCurrentLetter = () => {
    return currArrayOfArrayOfWords[currWordPosition.current][currLetterPosition.current]
  }

  const getCurrentWord = () => {
    return currArrayOfArrayOfWords[currWordPosition.current]
  }

  const restartTest = () => {
    inputRef.current.focus()
    currLetterPosition.current = 0
    currWordPosition.current = 0
    setRestart(!restart)
    initializeNewTest()
  }


  return(
    <div className="center-of-mid typer-container">
      <div ref={inputRef} id="test" tabIndex={0} className="word-container-wrapper">
        <div className="word-container">
          {currArrayOfArrayOfWords.map((word, index) => 
            <div key={index} className="word">
              {word.map((letter, index) => <Letter key={index} letterText={letter.letterText} letterState={letter.state} />  )}
            </div> )}
        </div>
      </div> 
      <button onClick={restartTest} className="restart-btn">
        <FaRedoAlt />
      </button>
    </div>
  )
}


export default TypingTest