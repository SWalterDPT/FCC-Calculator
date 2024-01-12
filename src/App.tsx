import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the current expression, the answer, and a flag for the last equals press
  const [expression, setExpression] = useState<string>('0');
  const [answer, setAnswer] = useState<string>('');
  const [lastPressedWasEquals, setLastPressedWasEquals] = useState<boolean>(false);

  // Function to check if a symbol is an operator
  const isOperator = (symbol: string) => /[*/+-]/.test(symbol);

  // Handles button presses for different calculator inputs
  const buttonPress = (symbol: string) => {
    let currentExpression = expression;
  
    if (symbol === 'clear') {
      // Reset the calculator to its initial state
      setExpression('0');
      setAnswer('');
      setLastPressedWasEquals(false);
    } else if (symbol === '=') {
      // Perform calculation and set flag indicating equals was last pressed
      calculate();
      setLastPressedWasEquals(true);
    } else if (isOperator(symbol)) {
      // Handle operator input, allowing for negative numbers and operator replacement
      if (lastPressedWasEquals) {
        setExpression(answer + symbol);
        setLastPressedWasEquals(false);
      } else {
        if (isOperator(currentExpression.slice(-1))) {
          if (symbol === '-' && currentExpression.slice(-1) !== '-') {
            // If the new symbol is '-', add it after the existing operator
            setExpression(currentExpression + symbol);
          } else {
            // For other operators, replace the last operator(s)
            currentExpression = currentExpression.replace(/[\+\-\*\/]+$/, '');
            setExpression(currentExpression + symbol);
          }
        } else {
          setExpression(currentExpression + symbol);
        }
      }
    } else if (symbol === '.') {
      // Prevent multiple decimals in a single number
      const parts = currentExpression.split(/[\+\-\*\/]/);
      const lastNumber = parts.pop() || '';
      if (!lastNumber.includes('.')) {
        setExpression(currentExpression + symbol);
      }
    } else {
      // Handle number input and reset expression if equals was last pressed
      if (lastPressedWasEquals) {
        setExpression(symbol);
        setLastPressedWasEquals(false);
      } else {
        if (currentExpression === '0') {
          setExpression(symbol);
        } else {
          setExpression(currentExpression + symbol);
        }
      }
    }
  };

  // Performs the calculation and sets the answer
  const calculate = () => {
    try {
      const result = eval(expression).toString();
      setAnswer(result);
    } catch (error) {
      setAnswer('Error');
    }
  };

  // Render the calculator UI
  return (
    <div className="App">
      <div className="container calculator mt-4">
        <div className="row mt-3">
          <div className="col-12 text-right">
            <div id='display' className='form-control'>{answer || expression}</div>
          </div>
        </div>
        <div className='mt-2'>
          <div className='col-12'>
            {/* Numeric and Operator Buttons */}
            <div className='row'>
              <button className='btn btn-secondary col' id='seven' onClick={() => buttonPress('7')}>7</button>
              <button className='btn btn-secondary col' id='eight' onClick={() => buttonPress('8')}>8</button>
              <button className='btn btn-secondary col' id='nine' onClick={() => buttonPress('9')}>9</button>
              <button className='btn btn-warning col' id='divide' onClick={() => buttonPress('/')}>/</button>
            </div>
            <div className='row'>
              <button className='btn btn-secondary col' id='four' onClick={() => buttonPress('4')}>4</button>
              <button className='btn btn-secondary col' id='five' onClick={() => buttonPress('5')}>5</button>
              <button className='btn btn-secondary col' id='six' onClick={() => buttonPress('6')}>6</button>
              <button className='btn btn-warning col' id='multiply' onClick={() => buttonPress('*')}>*</button>
            </div>
            <div className='row'>
            <button className='btn btn-secondary col' id='one' onClick={() => buttonPress('1')}>1</button>
              <button className='btn btn-secondary col' id='two' onClick={() => buttonPress('2')}>2</button>
              <button className='btn btn-secondary col' id='three' onClick={() => buttonPress('3')}>3</button>
              <button className='btn btn-warning col' id='subtract' onClick={() => buttonPress('-')}>-</button>
            </div>
            <div className='row'>
              <button className='btn btn-secondary col-6' id='zero' onClick={() => buttonPress('0')}>0</button>
              <button className='btn btn-secondary col' id='decimal' onClick={() => buttonPress('.')}>.</button>
              <button className='btn btn-warning col' id='add' onClick={() => buttonPress('+')}>+</button>
            </div>
            {/* Control Buttons */}
            <div className='row'>
              <button className='btn btn-success col' id='equals' onClick={() => buttonPress('=')}>=</button>
              <button className='btn btn-danger col' id='clear' onClick={() => buttonPress('clear')}>AC</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;