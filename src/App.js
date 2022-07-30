//Imports
import React, { useState, useEffect, useRef } from 'react'
import Keyboard from "./components/Keyboard";
import {words} from "./words.js";
import Topbar from "./components/Topbar";
import { genreateRandomNumbers } from './utils';


function App() {

  const Starting_time = 20

  const [timer, setTimer] = useState(Starting_time)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [buttonText, setButtonText] = useState('Start')
  const [displayWords, setDisplayWords] = useState(['Click', ['the start button!']])
  const [formData, setFormData] = useState()
  const [userInput, setUserInput] = useState([])
  const [gameFinished, setGameFinished] = useState(false)
  const [typos, setTypos] = useState(0)
  const textBoxRef = useRef(null)
 

  //timer count down
  useEffect(() => {

    if (isTimeRunning && timer > 0){
      setTimeout(() => {
        setTimer(prevTime => prevTime - 1)
      }, 1000);
    }else if (timer === 0){
      endGame()
    }

  }, [timer, isTimeRunning])
  
//Change Button Text
  useEffect(()=>{
  if (isTimeRunning){
    setButtonText('Active')
  }
},[isTimeRunning])

//start Game by turning isTimeRunning to true
const startGame = ()=>{
  setTypos(0)
  setTimer(Starting_time)
  setIsTimeRunning(true)
  setDisplayWords(genreateRandomNumbers())
  setUserInput([])
  //function imported from util to create an array of 50 joined words to display
  setGameFinished(false)
  textBoxRef.current.disabled = false
  textBoxRef.current.focus()
  
}
//capture user input for keyboard
function captureInput(e){
  const userInputArray = []
  setFormData(e.target.value)
  userInputArray.push(e.target.value.split(' '))
  setUserInput(userInputArray[0])

}

function handleKeyPress(){
  console.log("e")
}




function endGame() {

  setIsTimeRunning(false)
  textBoxRef.current.disabled = true
  setButtonText('Start')
  setFormData('')
  if (timer === 0 && !isTimeRunning){
    for (let i = 0; i < userInput.length; i++){
      if (userInput[i] !== displayWords[i]){
        setTypos(prevState => prevState + 1)
      }
  }
  
  }
  
  
  setTimeout(() => {
    setGameFinished(true)
  }, 1000);
  }
  


  
  return (
    
    <div className="app">

      <Topbar 
        timer={timer} 
        startGame={startGame}
        buttonText = {buttonText}
      />      
      {!gameFinished && <div className='display-text'>
        <div className='scroller'>
          {displayWords.map((word, index) => {
            return <p className='word' key={index}>{word}</p>
          })}

        </div> 
      </div>}

      {gameFinished && <div className='score'>
        <p className='result'>Total Words Typed: {userInput.length}</p>
        <p className='result'>Total Mistakes: {typos}</p>
        
        </div>}

          {!gameFinished && <div>
            
            </div>}
      <textarea 
        onChange={captureInput} 
        placeholder='Start Typing Here...' 
        value={formData}
        disabled = {!isTimeRunning}
        ref = {textBoxRef}
      />  

      <Keyboard  onKeyPress={(e) => handleKeyPress(e)}/>
      
    </div>
   
  )
}

export default App;
