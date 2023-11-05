import './Quiz.css';
import { useEffect, useState } from "react";
import questions from './questions.json'
 
export default function Quiz({ getMarks ,completed,getLength}) {

  const [QueueQuestion, setQueueQuestion] = useState([...questions]);
  useEffect(()=>{
    getLength(QueueQuestion.length)
  },[])
 
  const [currentQuestion, setCurrentQuestion] = useState(QueueQuestion[0]);
  const [selectedOption, setSelectedOption] = useState('');
  const [QNum, setQNum] = useState(1);

  function handleOptionChange(option) {
    setSelectedOption(option);
  }

  function handleNext() {
    const score = selectedOption === currentQuestion.answer ? 1 : 0;
    getMarks(score);
    const updatedQueue = QueueQuestion.slice(1);
    setQueueQuestion(updatedQueue);
    setCurrentQuestion(updatedQueue[0]); 
    setSelectedOption(''); 
    setQNum(QNum+1);
  }
function handleNextFinal(){
  handleNext();
  completed(true);
}
  return (
    <div className="quiz-container">
      {currentQuestion ? (
        <>
          <p className="question-heading">Q{QNum}: {currentQuestion.question}</p>
          <ul className="options-list">
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="options" 
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  id={index+"_"+option}
                />
                <label htmlFor={index+"_"+option}>{option}</label>
                
              </li>
            ))}
          </ul>
          {QueueQuestion ? (
            QueueQuestion.length === 1 ? (
              <button className="next-button" onClick={handleNextFinal}>Submit</button>
            ) : (
              <button className="next-button" onClick={handleNext}>Next</button>
            )
          ) : <button className="next-button" onClick={handleNext}>Next</button>}


        </>
      ) : null
      }
    </div >
  );
}


