import React, { useEffect, useRef, useState } from 'react';
import './Quiz.scss';
import { Field, Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { setIsloading } from '../../app/AuthSlice';
import { useAppDispatch } from '../../app/hooks';
import { withTokenInstance } from '../../axios/axios';
import { Answer, Question } from '../../app/@types.data';
import jwt_decode from 'jwt-decode';
import Result from '../../components/Result/Result';

export default function Quiz() {
  const [questions, setQuestions] = React.useState<Question[] | []>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    '1'
  );
  const [title, setTitle] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<null>(null);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleFetchQuiz = async () => {
    dispatch(setIsloading(true));
    try {
      const res = await withTokenInstance.get('quiz/' + id);
      setTitle(res.data.Title);
      setQuestions(res.data.Questions);
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsloading(false));
  };

  useEffect(() => {
    handleFetchQuiz();
  }, []);

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value !== selectedOption) {
      setSelectedOption(e.target.value);
    }
    if (e.target.value === selectedOption) {
      setSelectedOption('1');
    }
  };

  const handleChangeQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    num: number
  ) => {
    e.preventDefault();
    if (currentQuestion === 0 && num === -1) {
      return;
    }
    if (currentQuestion === questions.length - 1 && num === 1) {
      return;
    }
    const answer = {
      questionId: questions[currentQuestion]?.Id,
      optionId: parseInt(selectedOption as string),
    };
    const answerIndex = answers.findIndex(
      (a) => a.questionId === answer.questionId
    );
    if (answerIndex !== -1) {
      answers[answerIndex] = answer;
    } else {
      setAnswers([...answers, answer]);
    }

    setCurrentQuestion(currentQuestion + num);
    selectedOption && setSelectedOption('1');
  };

  const handleSubmit = async (values: { radio: string }) => {
    dispatch(setIsloading(true));
    const answersPayload = [
      ...answers,
      {
        questionId: questions[currentQuestion]?.Id,
        optionId: parseInt(selectedOption as string),
      },
    ];

    const userId = localStorage.getItem('id');
    const quizId = id;
    try {
      const res = await withTokenInstance.post(
        `Results?UserId=${userId}&QuizId=${quizId}`,
        answersPayload
      );
      setResult(res.data.score);
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsloading(false));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{
        radio: selectedOption,
      }}
    >
      {({ handleSubmit, form }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
          }}
        >
          <h2>{title}</h2>
          {result !== null ? (
            <Result result={result} length={questions.length} />
          ) : (
            <form
              className='mt-5'
              onSubmit={handleSubmit}
              style={{ flexGrow: 1 }}
            >
              <div className='row'>
                <div className='col-12 col-md-offset-2'>
                  <div
                    className='jumbotron text-center'
                    id='question-container'
                  >
                    <h2 id='question'>{questions[currentQuestion]?.Text}</h2>
                  </div>
                  <div className='row'>
                    <div className='col-12 col-md-offset-3'>
                      <div className='text-center w-100' id='answers-container'>
                        {questions[currentQuestion]?.Options.map((option) => {
                          return (
                            <Field name='radio' type='radio' value={option.Id}>
                              {({ input }) => {
                                return (
                                  <div
                                    className={
                                      parseInt(selectedOption as string) ===
                                      option.Id
                                        ? 'answer active'
                                        : 'answer'
                                    }
                                    data-content='1000'
                                  >
                                    <input
                                      name={input.name}
                                      type='radio'
                                      value={option.Id}
                                      checked={input.checked}
                                      onChange={(e) => {
                                        handleChangeAnswer(e);
                                        input.onChange(e);
                                      }}
                                    />
                                    <label>{option.Text}</label>
                                  </div>
                                );
                              }}
                            </Field>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <footer>
                <div className='row'>
                  <div className='col-md-8 col-md-offset-2 d-flex gap-5 justify-content-between w-100'>
                    <button
                      onClick={(e) => handleChangeQuestion(e, -1)}
                      className='btn btn-primary pull-left'
                      id='previousQ'
                      disabled={currentQuestion === 0}
                    >
                      &nbsp;Previous&nbsp;
                    </button>
                    <button
                      onClick={(e) => handleChangeQuestion(e, 1)}
                      type='submit'
                      className='btn btn-primary pull-right'
                      id='nextQ'
                      disabled={currentQuestion === questions.length - 1}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    <button
                      className='btn btn-primary pull-right'
                      id='finish'
                      disabled={answers.length < questions.length - 1}
                    >
                      &nbsp;&nbsp;Finish&nbsp;&nbsp;
                    </button>
                  </div>
                </div>
              </footer>
            </form>
          )}
        </div>
      )}
    </Form>
  );
}
