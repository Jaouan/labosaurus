import { useState, useEffect, SyntheticEvent } from 'react';
import clsx from 'clsx';

import './SimpleQuestion.css';

interface Answer {
  answerId: string | number;
  label: string;
  details?: string;
}

const toAnswerObject = (anAnswer: string | Answer, answerIndex: number): Answer => ({
  ...(typeof anAnswer === 'string' ? { label: anAnswer } : anAnswer),
  answerId: answerIndex
});

const shuffleArray = <T,>(arr: T[]): T[] =>
  arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

interface SimpleQuestionProps {
  label: string;
  answer: string | Answer;
  wrongAnswers: Array<string | Answer>;
  questionId?: string | number;
  onAnswer?: (answerInformation: {
    selectedAnswer: string;
    isCorrect: boolean;
    questionId?: string | number;
    answerId: string | number;
    originEvent?: SyntheticEvent<Element, any>;
  }) => void;
}

export const SimpleQuestion: React.FC<SimpleQuestionProps> = ({
  label,
  answer,
  questionId,
  wrongAnswers,
  onAnswer
}) => {
  const [goodAnswer, setGoodAnswer] = useState<Answer>({} as Answer);
  const [allAnswers, setAllAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | false>(false);

  useEffect(() => {
    const orderedAnswers: Answer[] = [answer, ...wrongAnswers].map(toAnswerObject);
    setGoodAnswer(orderedAnswers[0]);
    setAllAnswers(shuffleArray(orderedAnswers));
  }, [answer, wrongAnswers]);

  const selectAnswer = (selectedAnswer: Answer, originEvent?: SyntheticEvent<Element, any>) => {
    setSelectedAnswer(selectedAnswer.label);
    onAnswer?.({
      selectedAnswer: selectedAnswer.label,
      answerId: allAnswers.find(anAnswer => selectedAnswer.label === anAnswer.label)?.answerId ?? -1,
      questionId,
      isCorrect: selectedAnswer.label === goodAnswer.label,
      originEvent
    });
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
                'answer--good': selectedAnswer && anAnswer.label === goodAnswer.label,
                'answer--wrong':
                  selectedAnswer && anAnswer.label !== goodAnswer.label && selectedAnswer === anAnswer.label
              })}`}
              onClick={evt => selectAnswer(anAnswer, evt)}
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
