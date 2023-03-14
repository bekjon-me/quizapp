import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { MAIN, PROFILE } from '../../router/utils';
import userImg from '../../assets/images/user.png';
import { useAuth } from '../../hooks/UseAuth';
import Button from '../Button/Button';
import { GrLogout } from 'react-icons/gr';
import { nonTokenInstance } from '../../axios/axios';
import { LOGOUT_USER } from '../../utils/urls';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from '../../app/AuthSlice';

export default function Header() {
  const { isUser, fullName } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    const { refresh_token } = JSON.parse(
      localStorage.getItem('tokens') as string
    );

    try {
      const res = await nonTokenInstance.post(
        LOGOUT_USER + '?refreshToken=' + refresh_token
      );

      if (res.status === 204) {
        localStorage.removeItem('tokens');
        dispatch(logOut());
        toast.success("You've been logged out successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={styles.header}>
      <Link to={MAIN}>
        <h2 className={styles.logo}>QuizApp</h2>
      </Link>
      <Link to={PROFILE}></Link>
      <div className={styles.profile}>
        <span className={styles.login}>{isUser ? fullName : 'Login'}</span>
        <div className='dropdown'>
          <button
            className='btn btn-transparent'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <img className={styles.userImg} src={userImg} alt='user image' />
          </button>
          <ul className='dropdown-menu'>
            <li>
              <p className='dropdown-item'>Action</p>
            </li>
            <li>
              <p className='dropdown-item'>Another action</p>
            </li>
            <li
              onClick={handleLogOut}
              className={`bg-danger  ${styles.logoutBtn}`}
            >
              <p className='dropdown-item'>Logout</p>
              <GrLogout />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
