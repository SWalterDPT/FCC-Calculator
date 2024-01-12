import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the current expression, the answer, and a flag for the last equals press
  const [expression, setExpression] = useState<string>('0');
  const [answer, setAnswer] = useState<string>('');
  const [lastPressedWasEquals, setLastPressedWasEquals] = useState<boolean>(false);

  // Function to check if a symbol is an operator
  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

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
            setExpression(currentExpression + symbol);
          } else {
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
      // Use eval to calculate the result from the expression string
      const result = eval(expression).toString();
      setAnswer(result);
    } catch (error) {
      // Handle any errors that occur during calculation
      setAnswer('Error');
    }
  };

  // Render the calculator UI
  return (
    <div className="App">
      <div className="container calculator mt-4">
        <div className="row mt-3">
          <div className="col-12 text-right">
            {/* Display the current answer or expression */}
            <div id='display' className='form-control'>{answer || expression}</div>
          </div>
        </div>
        <div className='mt-2'>
          <div className='col-12'>
            {/* Numeric and Operator Buttons */}
            {/* Buttons are set up to call buttonPress with the corresponding symbol */}
            {/* ... (Button JSX code) ... */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
