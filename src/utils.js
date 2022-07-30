import { words } from "./words";


//create display text
function genreateRandomNumbers(){
    const randomWordsArray = []
    for (let i = 0; i < 40; i++){
        let randomNum = Math.floor(Math.random() * words.length)
        randomWordsArray.push(words[randomNum])
      }
      return randomWordsArray
}

export { genreateRandomNumbers }