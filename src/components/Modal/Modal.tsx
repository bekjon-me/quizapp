import React, { Dispatch, SetStateAction } from 'react';
import { Field, Form } from 'react-final-form';
import styles from './Modal.module.scss';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuiz, selectQuizzes } from '../../app/QuizzesSlice';
import { withTokenInstance } from '../../axios/axios';
import { Question } from '../../app/@types.data';

interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function Modal(props: IProps) {
  const { quizzes } = useAppSelector(selectQuizzes);
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = React.useState<Question[] | []>([
    {
      Id: 0,
      Text: '',
      QuizId: 0,
      Options: [
        {
          Id: 0,
          Text: '',
          QuestionId: 0,
          IsCorrect: false,
        },
      ],
    },
  ]);

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
    };

    try {
      const res = await withTokenInstance.post('quiz', payload);
      dispatch(addQuiz(res.data));
    } catch (error) {
      console.log(error);
    }
    props.setModal(false);
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
