const randomWords = require('random-words')

  const getWords = () => {
    var words = randomWords({ exactly: 20, maxLength: 6 })
    // Adds a space at the beginning, end and in between each element of the array of words
    words = words.reduce((acc: string[], cur: string) => acc.concat(cur, " "), [" "])
    // Remove the first and last space in the array, respectively
    words.splice(0, 1)
    words.splice(words.length - 1, 1)
    return words
  }


  var words = randomWords({ exactly: 20, maxLength: 6 })
  // Adds a space at the beginning, end and in between each element of the array of words
  words = words.reduce((acc: string[], cur: string) => acc.concat(cur, " "), [" "])
  // Remove the first and last space in the array, respectively
  words.splice(0, 1)
  words.splice(words.length - 1, 1)


export {words}
export {getWords}
