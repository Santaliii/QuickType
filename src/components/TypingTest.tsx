import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import letterStack from "../classes/LetterStack";
import Letter from "./Letter";
import Timer from "./Timer";
import { arrayOfArrayOfWords } from "../types/types";


interface ITypingTestProps {
  currArrayOfArrayOfWords: arrayOfArrayOfWords,
  updateWordArray: (currArray: arrayOfArrayOfWords) => void,
  updateFinish: (timeToFinish: number) => void,
  initializeNewTest: () => void,
  updateTestStart: (testStart: boolean) => void,
  testFinished: boolean,
  testStarted: boolean
}



const TypingTest: React.FC<ITypingTestProps> = ({ currArrayOfArrayOfWords, testFinished, testStarted,  updateWordArray, updateFinish, updateTestStart, initializeNewTest}) => {

  /* char stack that keeps track of each letter the user inputs.
  Pushes each pressed letter onto the stack then compares it to the correct input
  based on currLetterPosition */
  let currLetterStack = new letterStack<string>()
  let timeAtTestStart = new Date('')
  let typingTest = useRef() as MutableRefObject<HTMLDivElement>
  const [restart, setRestart] = useState<boolean>(false)
  const [isTyperFocused, setIsTyperFocused] = useState<boolean>(false)
  /* Tracks the position of the word and letter that is next expected to be input from the user.
  Is either incremented/decremented based on the user's input */
  let currLetterPosition = useRef(0)
  let currWordPosition = useRef(0)
  useEffect(() => {

    let typingTestRef = typingTest.current

    const setupListeners = () => {
      window.addEventListener("keypress", () => {
        if(!isTyperFocused){
          typingTestRef.focus()
          setIsTyperFocused(true)
        }
      })
      window.addEventListener("click", () => {
        setTimeout(() => {
            setIsTyperFocused(false)
        }, 1000)
      })
      typingTestRef.addEventListener("keydown", onType)
      typingTestRef.addEventListener("keydown", onFirstType, {once: true})

      // For mobile devices
      typingTestRef.addEventListener("touchstart", onType)
      typingTestRef.addEventListener("touchstart", onFirstType, {once: true})
    }
    
    setupListeners()

    return () => {
      setIsTyperFocused(true)
      typingTestRef.removeEventListener("keydown", onType)
      typingTestRef.removeEventListener("touchstart", onType)
      currLetterPosition.current = 0
      currWordPosition.current = 0
    }
    
  }, [restart])

  const onFirstType = () => {
    timeAtTestStart = new Date()
    updateTestStart(true)
  }

  // Event listener to listen for any keypress that occurs, including ones that do not produce printable characters
  const onType = (event: any) => {
    
    // Pushes the letter that was input by the user to the currLetterStack, so it can be compared to the correct array
    currLetterStack.push(event.key)
    if(event.key === 'Backspace'){
      // If we are at the first letter of the first word, don't do anything
      if(currWordPosition.current === 0 && currLetterPosition.current === 0)
        return
      
      // If the current letter is an extra incorrect letter, reset its state.
      getCurrentLetter().state === "incorrectTemp" ? getCurrentLetter() : setLetterState("")
      // If we're at the first letter of a word
      if(currLetterPosition.current === 0){
        // Go back to the previous word
        currWordPosition.current--
        // Position the current letter at the end of that previous word
        currLetterPosition.current = getCurrentWord().length
      }
      // If not, go back to the previous letter normally
      currLetterPosition.current--

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
      if(currLetterStack.peek() === " " && (currWordPosition.current !== currArrayOfArrayOfWords.length - 1)){
        getCurrentLetter().state = ""
        currWordPosition.current++
        currLetterPosition.current = 0
      }
      else if(getCurrentLetter().letterText === " "){
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
    typingTest.current.focus()
    currLetterPosition.current = 0
    currWordPosition.current = 0
    setRestart(!restart)
    initializeNewTest()
    updateTestStart(false)
  }

  return(
    <div className="center-of-mid typer-container">

      <div ref={typingTest} id="test" tabIndex={0} className="word-container-wrapper">

        { testStarted ? <Timer testFinished={testFinished} currWordArray={currArrayOfArrayOfWords} /> : 
          // Placeholder to account for the size of the WPM counter when it's displayed
          <div className="timer">
            <h1 style={{opacity: 0}}>placeholder</h1>
          </div>
        }

        {isTyperFocused ? '' : <div className="focus-instruction">Press any key to focus</div> }


        <div className={`word-container ${isTyperFocused ? '' : 'unfocused'}`}>

          { currArrayOfArrayOfWords.map((word, index) => 

            <div key={index} className="word">

              {word.map((letter, index) => <Letter key={index} letterText={letter.letterText} letterState={letter.state} />  )}

            </div> )

          }

        </div>

      </div> 

      <button onClick={restartTest} className="restart-btn">
        restart
      </button>

    </div>
  )
}


export default TypingTest