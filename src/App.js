import React, {Component} from 'react';
import './App.css';

const nums =[7,8,9,4,5,6,1,2,3,0];
const ops =['/' , 'x' , '-' , '+' , '='];

class App extends Component {

  state={
    lastPressed: undefined,
    currentNumber: '0',
    prevNumber: undefined,
    operation: undefined
  }

  handleClick = (event)=>{
    const { lastPressed, currentNumber , prevNumber , operation}= this.state;
    const { innerText } = event.target;
    if(!Number.isNaN(Number(innerText))){
      if(currentNumber === '0'){
        this.setState({
          currentNumber: innerText 
        })
      } else{
        this.setState({
          currentNumber: currentNumber + innerText
        })
      }

    }
    switch(innerText){
      case 'AC': {
        this.setState({
          currentNumber:'0',
          prevNumber: undefined
        });
        break;
      }
      case '.':{
        if(!currentNumber.includes('.')){
          this.setState({
            currentNumber:currentNumber + innerText
          });
        }
        break;
        }
      default:{

      }
    }
    
  }

  render(){
    const { currentNumber } = this.state;
  return (
    <div className="calculator">
    <div className="display" id="display">{currentNumber}</div>
    <div className="nums-container">
    <button className="red" onClick={this.handleClick}>AC</button>
      {nums.map(num=>(
        <button className={`${num === 0 && 'big-h'}`} key={num} onClick={this.handleClick}>
          {num}
        </button>
      ))}
      <button className="gray" onClick={this.handleClick}>.</button>
    </div>
    <div className="ops-container">
      {ops.map(op=>(
        <button className={`yellow ${op === '=' && 'green'}`} id={`${op=== '=' && 'equals'}`} key={op} onClick={this.handleClick}>
        {op}
        </button>
      ))}
    </div>
    </div>
  );
}
}
export default App;
