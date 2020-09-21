import React, { Component } from "react";
import "./App.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+", "="];

class App extends Component {
  state = {
    lastPressed: undefined,
    currentNumber: "0",
    calc: undefined,
    operation: undefined,
  };

  handleClick = (event) => {
    const { currentNumber, calc, operation } = this.state;
    const { innerText } = event.target;

    this.setState({
      lastPressed: innerText
    })

    if (!Number.isNaN(Number(innerText))) {
      if (currentNumber === "0") {
        this.setState({
          currentNumber: innerText,
        });
      } else {
        this.setState({
          currentNumber: currentNumber + innerText,
        });
      }
      return;
    }
    switch (innerText) {
      case "AC": {
        this.setState({
          currentNumber: "0",
          calc: undefined,
          operation: undefined,
        });
        break;
      }
      case ".": {
        if (!currentNumber.includes(".")) {
          this.setState({
            currentNumber: currentNumber + innerText,
          });
        }
        break;
      }
      default: {
        if (!operation) {
          this.setState({
            operation: innerText,
            calc: currentNumber,
            currentNumber: "",
          });
        } else if (innerText === "=") {
          // eslint-disable-next-line no-eval
          const evaluated = eval(`${calc} ${operation} ${currentNumber}`);
          this.setState({
            operation: undefined,
            calc: evaluated,
            currentNumber: evaluated,
          });
        }else {
          const evaluated = eval(`${calc} ${operation} ${currentNumber}`);
          
          this.setState({
            operation:innerText,
            calc: evaluated,
            currentNumber: evaluated,
          });
        }
      }
    }
  };

  render() {
    const { currentNumber , calc , operation} = this.state;
    return (
      <div className="calculator">
        <div
          className="trial"
          style={{ color: "red", position: "absolute", top: 0 }}
        >
          {JSON.stringify(this.state)}
        </div>
        <div className="display" id="display">
        <small className="calc-display">{calc} {operation}</small>
          {currentNumber}
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
