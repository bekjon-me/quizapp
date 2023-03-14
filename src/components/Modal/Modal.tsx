import React, { Dispatch, SetStateAction } from 'react';
import { Field, Form } from 'react-final-form';
import styles from './Modal.module.scss';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectQuizzes } from '../../app/QuizzesSlice';
import { withTokenInstance } from '../../axios/axios';

interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function Modal(props: IProps) {
  const { quizzes } = useAppSelector(selectQuizzes);
  const dispatch = useAppDispatch();

  const question = {
    Id: 1,
    QuizId: 6,
    Text: 'What is the capital of France?',
    Options: [
      {
        Id: 1,
        questionId: 6,
        IsCorrect: true,
        Text: 'Paris',
      },
      {
        Id: 2,
        questionId: 6,
        IsCorrect: false,
        Text: 'London',
      },
      {
        Id: 3,
        questionId: 6,
        IsCorrect: false,
        Text: 'Berlin',
      },
      {
        Id: 4,
        questionId: 6,
        IsCorrect: false,
        Text: 'Rome',
      },
    ],
  };

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      Questoins: [question],
    };

    try {
      const res = await withTokenInstance.post('quiz', payload);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleModal = () => {
    props.setModal(false);
  };

  return (
    <div className={styles.modal} onClick={handleToggleModal}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.formAction}>
                <p onClick={handleToggleModal}>Cancel</p>
                <button type='submit'>Add</button>
              </div>
              <div className={styles.input}>
                <label>Title</label>
                <Field
                  name='title'
                  component='input'
                  type='text'
                  placeholder='add a title ...'
                  required
                />
              </div>
              <div className={styles.input}>
                <label>Description</label>
                <Field
                  name='description'
                  component='textarea'
                  placeholder='add a description ...'
                  required
                />
              </div>
            </form>
          )}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
