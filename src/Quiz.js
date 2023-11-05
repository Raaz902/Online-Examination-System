/* import { useEffect, useState } from "react";
export default function Quiz({ getMarks }) {
  
  const data = [
    {
      "question": "What is the capital of France?",
      "options": ["New York", "London", "Paris", "Dublin"],
      "answer": "Paris"
    },
    {
      "question": "Who painted the Mona Lisa?",
      "options": ["Vincent Van Gogh", "Pablo Picasso", "Leonardo Da Vinci", "Claude Monet"],
      "answer": "Leonardo Da Vinci"
    },
    {
      "question": "What is the largest planet in our solar system?",
      "options": ["Earth", "Mars", "Jupiter", "Venus"],
      "answer": "Jupiter"
    },
    {
      "question": "What is the chemical symbol for gold?",
      "options": ["Au", "Ag", "Fe", "Cu"],
      "answer": "Au"
    },
    {
      "question": "Which gas do plants absorb from the atmosphere?",
      "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      "answer": "Carbon Dioxide"
    },
    {
      "question": "In which year did Christopher Columbus first voyage to the Americas?",
      "options": ["1492", "1500", "1607", "1776"],
      "answer": "1492"
    },
    {
      "question": "What is the largest mammal in the world?",
      "options": ["Elephant", "Blue Whale", "Giraffe", "Lion"],
      "answer": "Blue Whale"
    },
    {
      "question": "Which country is known as the Land of the Rising Sun?",
      "options": ["China", "Japan", "South Korea", "India"],
      "answer": "Japan"
    },
    {
      "question": "What is the chemical symbol for water?",
      "options": ["Wa", "H2O", "Hy", "O2H"],
      "answer": "H2O"
    },
    {
      "question": "Who wrote the play 'Romeo and Juliet'?",
      "options": ["William Shakespeare", "Jane Austen", "George Orwell", "Charles Dickens"],
      "answer": "William Shakespeare"
    }
  ];
  const [QueueQuestion, setQueQuestion] = useState([...data]);
  const [currentQuestion, setCurrentQ] = useState();
  const [option, setOption] = useState('');
  console.log(currentQuestion)

  if (!currentQuestion) {
    NextQ();
  }
  function NextQ() {
    const current = QueueQuestion.shift();
    setCurrentQ(current);
    setOption('');
  }
  function Next() {    
    const score = setScore();
    getMarks(score);
    NextQ();


  }
  function setScore() {
    if (currentQuestion.answer == option) {
      return (1);
    } else {
      return (0);
    }
  }
  return (
    <div>
      {currentQuestion ?
        <>
          <h1>{currentQuestion.question}</h1>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}> <input type="radio" value={option} name={currentQuestion.question} onChange={(e) => setOption(e.target.value)} /> {option}</li>

            ))}
            <button onClick={Next} >Next</button>
          </ul>


        </> : null}
    </div>
  )
} */

import './Quiz.css';
import { useEffect, useState } from "react";
export default function Quiz({ getMarks ,completed,getLength}) {
  const data = [
    {
      "question": "What is the capital of France?",
      "options": ["New York", "London", "Paris", "Dublin"],
      "answer": "Paris"
    },
    {
      "question": "Who painted the Mona Lisa?",
      "options": ["Vincent Van Gogh", "Pablo Picasso", "Leonardo Da Vinci", "Claude Monet"],
      "answer": "Leonardo Da Vinci"
    },
    {
      "question": "What is the largest planet in our solar system?",
      "options": ["Earth", "Mars", "Jupiter", "Venus"],
      "answer": "Jupiter"
    },
    {
      "question": "What is the chemical symbol for gold?",
      "options": ["Au", "Ag", "Fe", "Cu"],
      "answer": "Au"
    },
    {
      "question": "Which gas do plants absorb from the atmosphere?",
      "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      "answer": "Carbon Dioxide"
    },
    {
      "question": "In which year did Christopher Columbus first voyage to the Americas?",
      "options": ["1492", "1500", "1607", "1776"],
      "answer": "1492"
    },
    {
      "question": "What is the largest mammal in the world?",
      "options": ["Elephant", "Blue Whale", "Giraffe", "Lion"],
      "answer": "Blue Whale"
    },
    {
      "question": "Which country is known as the Land of the Rising Sun?",
      "options": ["China", "Japan", "South Korea", "India"],
      "answer": "Japan"
    },
    {
      "question": "What is the chemical symbol for water?",
      "options": ["Wa", "H2O", "Hy", "O2H"],
      "answer": "H2O"
    },
    {
      "question": "Who wrote the play 'Romeo and Juliet'?",
      "options": ["William Shakespeare", "Jane Austen", "George Orwell", "Charles Dickens"],
      "answer": "William Shakespeare"
    }
  ];
  const [QueueQuestion, setQueueQuestion] = useState([...data]);
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
    const updatedQueue = QueueQuestion.slice(1); // Remove the current question from the queue
    setQueueQuestion(updatedQueue);
    setCurrentQuestion(updatedQueue[0]); // Move to the next question
    setSelectedOption(''); // Reset the selected option
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
                  name="options" // All radio buttons with the same name are part of the same group
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
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


