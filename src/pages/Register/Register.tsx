import React from 'react';
import styles from './Register.module.scss';
import { Field, Form } from 'react-final-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { handleRegister } from '../../service/register';
import { MAIN } from '../../router/utils';

export default function Login() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    handleRegister(values, dispatch);
  };
  return (
    <div className='container'>
      <h2 className={styles.logo}>QuizApp</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2 className={styles.welcome}>Welcome !</h2>
            <h2>Register </h2>
            <p className={styles.titleP}>your account</p>
            <div className={styles.email}>
              <label>Full Name</label>
              <Field
                name='fullName'
                component='input'
                type='text'
                placeholder='Full Name'
                required
              />
            </div>
            <div className={styles.email}>
              <label>Email</label>
              <Field
                name='email'
                component='input'
                type='email'
                placeholder='Email'
                required
              />
            </div>
            <div className={styles.password}>
              <label>Password</label>
              <Field
                name='password'
                component='input'
                type={passwordShown ? 'text' : 'password'}
                placeholder='Enter password'
                required
              />
              <span>
                {passwordShown ? (
                  <BiHide onClick={() => setPasswordShown(!passwordShown)} />
                ) : (
                  <BiShow onClick={() => setPasswordShown(!passwordShown)} />
                )}
              </span>
            </div>
            <div className={styles.remember}>
              <div className={styles.rememberMe}></div>
              <div className={styles.forgotPassword}>
                <a href='#'>Forgot password ?</a>
              </div>
            </div>

            <button type='submit'>Submit</button>

            <div className={styles.signUp}>
              <p>Already have an account?</p>
              <Link to={MAIN}>Login</Link>
            </div>
          </form>
        )}
      />
    </div>
  );
}
