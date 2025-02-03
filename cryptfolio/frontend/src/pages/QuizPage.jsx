import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: 'What is machine learning?',
      answers: [
        'A type of computer hardware',
        'A programming language',
        'A subset of artificial intelligence',
        'A database management system',
      ],
      correctAnswer: 2,
    },
    {
      question: 'Which of the following is an example of supervised learning?',
      answers: [
        'Clustering',
        'Association rules',
        'Linear regression',
        'Dimensionality reduction',
      ],
      correctAnswer: 2,
    },
    {
      question: 'What is the purpose of the activation function in neural networks?',
      answers: [
        'To initialize weights',
        'To introduce non-linearity',
        'To normalize input data',
        'To calculate the loss',
      ],
      correctAnswer: 1,
    },
  ];

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Quiz: Machine Learning Basics</h1>
      {!quizCompleted ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">{questions[currentQuestion].question}</p>
          <div className="space-y-4">
            {questions[currentQuestion].answers.map((answer, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerClick(index)}
                className={`w-full text-left p-4 rounded-lg ${
                  selectedAnswer === index
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                } hover:bg-indigo-500 hover:text-white transition duration-300`}
              >
                {answer}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Quiz Completed!</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Your score: {score} out of {questions.length}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Retake Quiz
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizPage;

