import React, { useState } from 'react';

const DailyQuizTab = ({ completeDailyQuiz, dailyQuizAvailable, loading }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const question = {
    text: "Which of the following best describes a blockchain?",
    options: [
      "A centralized database used by banks",
      "A distributed, immutable ledger of transactions",
      "An advanced form of spreadsheet",
      "A secure messaging protocol"
    ],
    correctAnswer: "A distributed, immutable ledger of transactions"
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option before submitting.");
      return;
    }

    setSubmitted(true);
    const isCorrect = selectedOption === question.correctAnswer;
    setCorrect(isCorrect);

    if (isCorrect) {
      completeDailyQuiz(); // Give reward only on correct answer
    } else {
      alert("Incorrect answer. No reward today!");
    }
  };

  if (!dailyQuizAvailable) {
    return (
      <div className="text-center text-green-600 font-semibold">
        ✅ You’ve already completed today’s quiz. Come back tomorrow!
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🧠 Daily Quiz - Blockchain Basics</h2>
      
      <p className="mb-4 text-lg font-medium">{question.text}</p>

      <div className="flex flex-col gap-3 mb-6">
        {question.options.map((opt, idx) => (
          <label
            key={idx}
            className={`flex items-center border rounded-lg px-4 py-2 cursor-pointer transition ${
              selectedOption === opt
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="quiz"
              value={opt}
              disabled={submitted}
              checked={selectedOption === opt}
              onChange={() => setSelectedOption(opt)}
              className="mr-3"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Submit
        </button>
      ) : (
        <div className="mt-4 text-center">
          {correct ? (
            <p className="text-green-600 font-semibold text-lg">🎉 Correct! You earned 10 SYNC tokens.</p>
          ) : (
            <p className="text-red-600 font-semibold text-lg">❌ Incorrect! Try again tomorrow.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyQuizTab;
