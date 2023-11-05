import { useState } from 'react';
import Quiz from './Quiz'
import './App.css';

function App() {
  const [marks, setMarks] = useState(0)
  const [result, setResult] = useState()
  const [max, SetMax] = useState()
  console.log(marks)
  function marksHandler(data) {
    setMarks(marks + data)
    //console.log(data)
  }
  function calScore(data) {
    // console.log(data)

    setResult(marks)
  }
  function setLength(data) {
    SetMax(data);
  }
  return (
    <div className="app-container">
      <h1 style={{ textAlign: "center" }}><i>Basic Quiz Application</i></h1>
      {result ? <p><b><i>Result:</i> You Got {result} out of {max} </b></p> : <Quiz getMarks={marksHandler} getLength={setLength} completed={calScore} />}

    </div>
  );
}

export default App;



