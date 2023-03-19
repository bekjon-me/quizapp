import React from 'react';
import styles from './QuizCard.module.scss';
import { Quiz } from '../../app/@types.data';
import { useNavigate } from 'react-router-dom';

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  const navigate = useNavigate();

  const handleQuiz = () => {
    navigate(`quiz/${quiz.id}`);
  };

  return (
    <div
      className={
        'card text-bg-light col-md-6 col-sm-12 col-lg-4 col-12' + styles.card
      }
      style={{ maxWidth: '100%' }}
      onClick={() => handleQuiz()}
      role='button'
    >
      <div className='card-header'>
        <p className='card.title fw-bold'>{quiz.title}</p>
      </div>
      <div className='card-body'>
        <p className='card-text'>{quiz.description}</p>
      </div>
    </div>
  );
}
