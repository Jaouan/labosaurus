import { useState, useEffect } from "react";
import clsx from "clsx";

import "./SimpleQuestion.css";

const toAnswerObject = (anAnswer) => anAnswer.label ? anAnswer : { label: anAnswer };

const suffleArray = (arr) => arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function SimpleQuestion({ label, answer, wrongAnswers, randomize }) {
    const [properAnswer, setProperAnswer] = useState({});
    const [allAnswers, setAllAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(false);

    useEffect(() => {
        setProperAnswer(toAnswerObject(answer))
        const orderedAnswers = [answer, ...wrongAnswers].map(toAnswerObject);
        setAllAnswers(randomize ? suffleArray(orderedAnswers) : orderedAnswers);
    }, []);

    const selectAnswer = (selectedAnswer) => setSelectedAnswer(selectedAnswer.label);

    return <div className={`block question ${clsx({ "question--answered": selectedAnswer })}`}>
        <div className="question-label">{label}</div>
        <ul>
            {allAnswers.map((anAnswer, answerIndex) => (
                <li key={answerIndex}>
                    <button
                        className={`block question ${clsx({
                            "answer--good": selectedAnswer && anAnswer.label === properAnswer.label,
                            "answer--wrong": selectedAnswer && anAnswer.label !== properAnswer.label && selectedAnswer === anAnswer.label
                        })}`}
                        onClick={() => selectAnswer(anAnswer)}
                        disabled={!!selectedAnswer}>
                        {anAnswer.label}
                        {selectedAnswer && anAnswer.details ? <div className="answer-details">{anAnswer.details}</div> : <></>}
                    </button>
                </li>
            ))}
        </ul>
    </div>;
}
