import React, { useEffect } from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import { useQuizzes } from '../../hooks/useQuizzes';
import { nonTokenInstance, withTokenInstance } from '../../axios/axios';
import { useAppDispatch } from '../../app/hooks';
import { setQuizzes } from '../../app/QuizzesSlice';
import QuizCard from '../../components/QuizCard/QuizCard';
import { setIsloading } from '../../app/AuthSlice';

export default function Main() {
  const [modal, setModal] = React.useState<boolean>(false);
  const { quizzes } = useQuizzes();
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    setModal(!modal);
  };

  const getQuizzes = async () => {
    dispatch(setIsloading(true));
    try {
      const res = await withTokenInstance.get('quiz');
      dispatch(setQuizzes(res.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsloading(false));
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div className={`container ${styles.main}`}>
      <Header />
      <div className={styles.actions}>
        <Button className={styles.addBtn} onClick={() => handleAdd()}>
          Add Quizz
        </Button>
      </div>

      <div className='row justify-content-center g-0 gap-4'>
        <h2 className='text-center card-title'>All quizzes</h2>
        {quizzes.map((quiz) => {
          return <QuizCard quiz={quiz} />;
        })}
      </div>

      {modal ? <Modal setModal={setModal} /> : ''}
    </div>
  );
}
