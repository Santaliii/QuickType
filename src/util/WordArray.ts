import { getWords } from "./WordsToType"

var wordArray: {letterText: string, state: string, isEndOfWord: boolean}[][] = []

export const getWordArray = (numOfWords: number) => {
   var words = getWords(numOfWords)
   wordArray = []
  for(let i = 0; i < words.length; i++){
    wordArray[i] = []
    for(let j = 0; j < words[i].length; j++){
      wordArray[i].push({letterText: words[i].charAt(j),
         state: "",
         isEndOfWord: words[i].charAt(j+1) === "" ? true : false })
    }
  }
  return wordArray
 }

