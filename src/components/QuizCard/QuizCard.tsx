import React from 'react';
import styles from './QuizCard.module.scss';
import { Quiz } from '../../app/@types.data';

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div
      className={
        'card text-bg-light col-md-6 col-sm-12 col-lg-4 col-12' + styles.card
      }
      style={{ maxWidth: '100%' }}
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
