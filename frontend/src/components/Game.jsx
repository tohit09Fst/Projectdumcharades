import React, { useState } from "react";
import styles from "./Game.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Game() {

  const questions = [
    {
      question: "A story of three friends whose friendship is tested by love and career choices. Which movie am I?",
      answer: "3 Idiots",
      hints: [
        "Based on a book by Chetan Bhagat",
        "Famous dialogue: 'All is well'",
        "Aamir Khan is one of the lead actors",
      ],
    },
    {
      question: "A love story where the hero dies, but their love is eternal. Which movie am I?",
      answer: "Kal Ho Naa Ho",
      hints: [
        "Shahrukh Khan plays the role of a dying man",
        "The title song became an anthem for hope and living in the moment",
        "The film is set in New York",
      ],
    },
    {
      question: "A gangster becomes a politician and fights for the common people. Which movie am I?",
      answer: "Nayak",
      hints: [
        "The hero becomes the Chief Minister for a day",
        "Anil Kapoor is the protagonist",
        "A movie about corruption and political reform",
      ],
    },
    {
      question: "A story of a brave man who leads a war against injustice and the British Empire. Which movie am I?",
      answer: "Lagaan",
      hints: [
        "It’s about cricket and freedom struggle",
        "Aamir Khan leads a group of villagers",
        "Set during British rule in India",
      ],
    },
    {
      question: "A police officer is determined to bring down a powerful criminal in this action-packed drama. Which movie am I?",
      answer: "Singham",
      hints: [
        "Ajay Devgn plays a tough cop",
        "Famous dialogue: 'Aata majhi satakli'",
        "Directed by Rohit Shetty",
      ],
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      toast.warning("Please enter an answer before submitting!");
      return;
    }

    const correctAnswer = questions[currentQuestion].answer.toLowerCase();
    const userAnswerTrimmed = userAnswer.trim().toLowerCase();
    const isLastHint = hintIndex === questions[currentQuestion].hints.length - 1;

    if (userAnswerTrimmed === correctAnswer) {
      toast.success("Correct Answer!");
      setScore((prevScore) => prevScore + 1);
    } else if (!isLastHint) {
      toast.error("Wrong Answer. Here's another hint!");
      setHintIndex(hintIndex + 1);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setHintIndex(0);
      setUserAnswer("");
    } else {
      localStorage.setItem("score", score + 1); 
      localStorage.setItem("user", "Player"); 
      setGameOver(true); 
      navigate("/greet"); 
    }
  };

  if (gameOver) {
    return (
      <div className={styles.card}>
        <h2 className={styles.question}>Game Over!</h2>
        <p className={styles.score}>Your final score: {score}</p>
      </div>
    );
  }

  return (
    <div className={styles.game}>
      <ToastContainer />
      <div className={styles.card}>
        <h2 className={styles.question}>Dumb Charades Game</h2>
        <p className={styles.question}>
          Question {currentQuestion + 1}: {questions[currentQuestion].question}
        </p>
        <p className={styles.hint}>
          Hint: {questions[currentQuestion].hints[hintIndex]}
        </p>

        <div>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Enter answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Submit Answer
          </button>
        </div>

        <p className={styles.score}>Your Score: {score}</p>
      </div>
    </div>
  );
}
