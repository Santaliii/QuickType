import { arrayOfArrayOfWords } from "../types/types";

const getNumOfCharacters = (finishedWordArray: arrayOfArrayOfWords) => {
  let numOfCharacters = 0
  for(let i = 0; i < finishedWordArray.length; i++){
    numOfCharacters += finishedWordArray[i].length
  }
  return numOfCharacters
}

const getNumOfCorrectCharacters = (finishedWordArray: arrayOfArrayOfWords) => {
  let numOfCorrectCharacters = 0
  for(let i = 0; i < finishedWordArray.length; i++){
    for(let j = 0; j < finishedWordArray[i].length; j++)
      if(finishedWordArray[i][j].state === "correct")
        numOfCorrectCharacters++
  }
  return numOfCorrectCharacters
}

export const getNetWPM = (timeToFinishTest: number, finishedWordArray: arrayOfArrayOfWords) => {
  return Math.floor((getNumOfCorrectCharacters(finishedWordArray) / (timeToFinishTest / 60)) / 5)
}

export const getGrossWPM = (timeToFinishTest: number, finishedWordArray: arrayOfArrayOfWords) => {
  return Math.floor((getNumOfCharacters(finishedWordArray) / (timeToFinishTest / 60)) / 5)
}
