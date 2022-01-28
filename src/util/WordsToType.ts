const randomWords = require('random-words')

export const getWords = (numOfWords: number) => {
  let words = randomWords({ exactly: numOfWords, maxLength: 6 })
  // Adds a space at the beginning, end and in between each element of the array of words
  words = words.reduce((acc: string[], cur: string) => acc.concat(cur, " "), [])
  // Remove last space in the array
  words.splice(words.length - 1, 1)
  return words
}