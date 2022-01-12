import { arrayOfArrayOfWords } from "../types/types";

export const getNumOfCorrectAndIncorrectCharacters = (finishedWordArray: arrayOfArrayOfWords) => {
  let NumOfCorrectAndIncorrectCharacters = 0
  for(let i = 0; i < finishedWordArray.length; i++){
    for(let j = 0; j < finishedWordArray[i].length; j++){
      if(finishedWordArray[i][j].state === "correct" || finishedWordArray[i][j].state === "incorrect")
        NumOfCorrectAndIncorrectCharacters++
    }   
  }
  return NumOfCorrectAndIncorrectCharacters
}

export const getNumOfCorrectCharacters = (finishedWordArray: arrayOfArrayOfWords) => {
  let numOfCorrectCharacters = 0
  for(let i = 0; i < finishedWordArray.length; i++){
    for(let j = 0; j < finishedWordArray[i].length; j++){
      if(finishedWordArray[i][j].state === "correct")
        numOfCorrectCharacters++
    }
  }
  return numOfCorrectCharacters
}

export const getNetWPM = (timeToFinishTest: number, finishedWordArray: arrayOfArrayOfWords) => {
  return Math.floor((getNumOfCorrectCharacters(finishedWordArray) / (timeToFinishTest / 60)) / 5)
}

export const getGrossWPM = (timeToFinishTest: number, finishedWordArray: arrayOfArrayOfWords) => {
  return Math.floor((getNumOfCorrectAndIncorrectCharacters(finishedWordArray) / (timeToFinishTest / 60)) / 5)
}
