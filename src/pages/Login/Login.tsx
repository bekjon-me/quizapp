import React from 'react';
import styles from './Login.module.scss';
import { Field, Form } from 'react-final-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { MAIN, REGISTER } from '../../router/utils';
import { useAppDispatch } from '../../app/hooks';
import { handleLogin } from '../../service/login';
import { useAuth } from '../../hooks/UseAuth';

export default function Login() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAuth();
  console.log(isLoading);

  const onSubmit = (values: any) => {
    handleLogin(values, dispatch);
  };

  return (
    <div className='container'>
      <Link to={MAIN}>
        <h2 className={styles.logo}>QuizApp</h2>
      </Link>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2 className={styles.welcome}>Welcome !</h2>
            <h2>Log in to</h2>
            <p className={styles.titleP}>your account</p>
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
                placeholder='Password'
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
              <div className={styles.rememberMe}>
                <Field name='rememberMe' component='input' type='checkbox' />
                <label>Remember me</label>
              </div>
              <div className={styles.forgotPassword}>
                <a href='#'>Forgot password ?</a>
              </div>
            </div>

            <button type='submit' disabled={isLoading}>
              Submit
            </button>

            <div className={styles.signUp}>
              <p>Don't have an account?</p>
              <Link to={REGISTER}>Register</Link>
            </div>
          </form>
        )}
      />
    </div>
  );
}
