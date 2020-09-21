import React, { Component } from "react";
import "./App.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+", "="];

class App extends Component {
  state = {
    lastPressed: undefined,
    calc: '0',
    operation: undefined,
  };

  handleClick = (event) => {

    const { calc , lastPressed } = this.state;
    const { innerText } = event.target;

    switch (innerText) {
      case 'AC': {
        this.setState({
          calc: '0'
        });
        break;
      }
      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }
      default: {
        let cNValue = undefined;
        if( ops.includes(innerText)){
          if(ops.includes(lastPressed) && innerText !== '-'){
          cNValue= calc.slice(0,-3) + ` ${innerText} `;
          }else{
            cNValue = `${calc} ${innerText} `;
          }
        }else{
          cNValue = calc === '0' ? innerText : (calc + innerText);
        }
          this.setState({
          calc: cNValue,
          lastPressed: innerText
        })

      }
    }


  }

  render() {
    const { calc } = this.state;
    return (
      <div className="calculator">
        <div
          className="trial"
          style={{ color: "red", position: "absolute", top: 0 }}
        >
          {JSON.stringify(this.state)}
        </div>
        <div className="display" id="display">
          {/* <small className="calc-display">{calc}</small> */}
          {calc}
        </div>
        <div className="nums-container">
          <button className="red" onClick={this.handleClick}>
            AC
          </button>
          {nums.map((num) => (
            <button
              className={`${num === 0 && "big-h"}`}
              key={num}
              onClick={this.handleClick}
            >
              {num}
            </button>
          ))}
          <button className="gray" onClick={this.handleClick}>
            .
          </button>
        </div>
        <div className="ops-container">
          {ops.map((op) => (
            <button
              className={`yellow ${op === "=" && "green"}`}
              id={`${op === "=" && "equals"}`}
              key={op}
              onClick={this.handleClick}
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
