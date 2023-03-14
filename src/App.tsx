import React, { useEffect } from 'react';
import './assets/main.scss';
import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';
import jwt_decode from 'jwt-decode';

function App() {
  useEffect(() => {
    const token = JSON.parse(
      localStorage.getItem('tokens') as string
    ).access_token;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      console.log(decodedToken);
      console.log(localStorage.getItem('id'));
    }
  }, []);

  return (
    <div className='container'>
      <AppRouter />
      <ToastContainer />
      <Loader />
    </div>
  );
}

export default App;
