import { useState } from 'react';
import './App.css';
let ans = Math.floor(Math.random()*100)+1;//the answer to check on between 1 and 100 inclusive
let trackBest = 100;
function App() {
  let [userInput,setUserInput] = useState();//the holder for the userInput
  let [outputMessage,setOutputMessage] = useState('?');//the holder for the message for user
  let [gameState,setGameState] = useState('default');//game state holder
  let [buttonMessage,setButtonMessage] = useState('Check')//the holder for the message that appears
  let [currentScore,setCurrentScore] = useState(0);//holder for the current score
  let [bestScore,setBestScore] = useState();//holder for the best score
  //the functionality to control the users input
  function handleInputChange(e){
    //makes sure user value is in allowed range
    if(!e.target.value||(e.target.value<=100&&e.target.value>=1)){
      setUserInput(e.target.value);
    }
  }
  //the functionality that determines the appropriate message to be given to user
  function handleOnClick(){
    setCurrentScore(prev=>prev+1);
    //increases current score with each click on button
    if(gameState==='default'){
      if(userInput<ans){//switches back to default state
        setOutputMessage('Too small!');
        setTimeout(()=>{
          setOutputMessage('?');
        },1250)
      }
      //switches gameState and updates correspoding messages
      else if(userInput===`${ans}`){
        setOutputMessage('Bingo!');
        setButtonMessage('Play again');
        //changes best attempt 
        if(currentScore+1<trackBest){
          trackBest = currentScore+1;
        }
        setBestScore(trackBest);
        setGameState('winner');
      }
      else if(userInput>ans){
        setOutputMessage('Too big!');
        setTimeout(()=>{
          setOutputMessage('?');
        },1250)
      }
    }
    //revert back all the states back to default state
    else if(gameState==='winner'){
      setButtonMessage('Check');
      ans = Math.floor(Math.random()*100)+1;//creates a new answer to check on between 1 and 100 inclusive
      setUserInput('');
      setOutputMessage('?');
      setCurrentScore(0);
      setGameState('default');
    }
  }
  return (
    <div className="App">
      <h1>
      Number Guesser
      </h1>
      <h2>
        Pick a number between 1-100
      </h2>
      <div className='top part'>
        <text >
          {outputMessage}
        </text>
      </div>
      <input type = 'number' value={userInput} onChange = {handleInputChange} placeholder='Guess' max={100} min={1}>
          
      </input>
      <br></br>
      <button onClick = {handleOnClick}>
        {buttonMessage}
      </button>
      <h3>Current tries: {currentScore} <br></br>Best attempt: {bestScore}</h3>
    </div>

  );
}

export default App;
