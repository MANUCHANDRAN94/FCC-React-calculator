import React, { Component } from "react";
import "./App.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
  7:'seven',
  8:'eight',
  9:'nine',
  4:'four',
  5:'five',
  6:'six',
  1:'one',
  2:'two',
  3:'three',
  0:'zero',
  '/':'divide',
  '*':'multiply',
  '-':'subtract',
  '+':'add'

}

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
        // eslint-disable-next-line no-eval
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }
      case '.': {
        // eslint-disable-next-line no-useless-escape
        const splited = calc.split(/[+\-\*\/]/);
        console.log(splited)
        const last = splited.slice(-1)[0];

        if(!last.includes('.')){
          this.setState({
            calc: calc+'.'
          })
        }
        break;
      }
      default: {
        let cNValue = undefined;
        if( ops.includes(innerText)){
          if(ops.includes(lastPressed) && innerText !== '-'){
            const lastNumberIdx = calc.split('').reverse()
            .findIndex(char => char !== ' ' && nums.includes(+char));
          cNValue= calc.slice(0 , calc.length - lastNumberIdx) + ` ${innerText} `;
          }else{
            cNValue = `${calc} ${innerText} `;
          }
        }else{
          cNValue = calc === '0' ? innerText : (calc + innerText);
        }
          this.setState({
          calc: cNValue
        })

      }
    }
    this.setState({
      lastPressed: innerText
    })
    
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
          <button className="red" id="clear" onClick={this.handleClick}>
            AC
          </button>
          {nums.map((num) => (
            <button
              className={`${num === 0 && "big-h"}`}
              id={ids[num]}
              key={num}
              onClick={this.handleClick}
            >
              {num}
            </button>
          ))}
          <button className="gray" id="decimal" onClick={this.handleClick}>
            .
          </button>
        </div>
        <div className="ops-container">
          {ops.map((op) => (
            <button
              className="yellow"
              id={ids[op]}
              key={op}
              onClick={this.handleClick}
            >
              {op}
            </button>
          ))}
          <button className="green"
           id="equals"
           onClick={this.handleClick}>
            =
          </button>
        </div>
      </div>
    );
  }
}
export default App;
