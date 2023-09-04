import { useState } from 'react';
import './App.css';
let ans = Math.floor(Math.random()*100)+1;//the answer to check on between 1 and 100 inclusive
function App() {
  let [userInput,setUserInput] = useState();//the holder for the userInput
  let [outputMessage,setOutputMessage] = useState('?');//the holder for the message for user
  let [gameState,setGameState] = useState('default');//game state holder
  let [buttonMessage,setButtonMessage] = useState('Check')
  //the functionality to control the users input
  function handleInputChange(e){
    //makes sure user value is in allowed range
    if(!e.target.value||(e.target.value<=100&&e.target.value>=1)){
      setUserInput(e.target.value);
    }
  }
  //the functionality that determines the appropriate message to be given to user
  function handleOnClick(){
    if(gameState==='default'){
      if(userInput<ans){
        console.log(ans);
        setOutputMessage('Too small!');
      }
      //switches gameState and updates correspoding messages
      else if(userInput===`${ans}`){
        console.log('hi');
        setOutputMessage('Bingo!');
        setButtonMessage('Play again');
        setGameState('winner');
      }
      else if(userInput>ans){
        setOutputMessage('Too big!');
      }
    }
    //revert back all the states back to default state
    else if(gameState==='winner'){
      setButtonMessage('Check');
      ans = Math.floor(Math.random()*100)+1;//creates a new answer to check on between 1 and 100 inclusive
      setOutputMessage('?');
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
    </div>

  );
}

export default App;
