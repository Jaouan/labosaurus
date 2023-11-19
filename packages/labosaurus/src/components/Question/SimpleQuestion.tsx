import { useState, useEffect } from 'react';
import clsx from 'clsx';

import './SimpleQuestion.css';

interface Answer {
  label: string;
  details?: string;
}

const toAnswerObject = (anAnswer: string | Answer): Answer =>
  typeof anAnswer === 'string' ? { label: anAnswer } : anAnswer;

const shuffleArray = <T,>(arr: T[]): T[] =>
  arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

interface SimpleQuestionProps {
  label: string;
  answer: string | Answer;
  wrongAnswers: Array<string | Answer>;
  onAnswer?: (selectedAnswer?: string) => void;
}

export const SimpleQuestion: React.FC<SimpleQuestionProps> = ({ label, answer, wrongAnswers, onAnswer }) => {
  const [properAnswer, setProperAnswer] = useState<Answer>({} as Answer);
  const [allAnswers, setAllAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | false>(false);

  useEffect(() => {
    setProperAnswer(toAnswerObject(answer));
    const orderedAnswers: Answer[] = [answer, ...wrongAnswers].map(toAnswerObject);
    setAllAnswers(shuffleArray(orderedAnswers));
  }, [answer, wrongAnswers]);

  const selectAnswer = (selectedAnswer: Answer) => {
    setSelectedAnswer(selectedAnswer.label);
    onAnswer?.(selectedAnswer.label);
  };

  return (
    <div
      className={`block question ${clsx({
        'question--answered': selectedAnswer
      })}`}
    >
      <div className="question-label">{label}</div>
      <ul>
        {allAnswers.map((anAnswer, answerIndex) => (
          <li key={answerIndex}>
            <button
              className={`block question ${clsx({
                'answer--good': selectedAnswer && anAnswer.label === properAnswer.label,
                'answer--wrong':
                  selectedAnswer && anAnswer.label !== properAnswer.label && selectedAnswer === anAnswer.label
              })}`}
              onClick={() => selectAnswer(anAnswer)}
              disabled={!!selectedAnswer}
            >
              {anAnswer.label}
              {selectedAnswer && anAnswer.details ? <div className="answer-details">{anAnswer.details}</div> : <></>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
