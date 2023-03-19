import { toast } from 'react-toastify';
import { nonTokenInstance } from '../axios/axios';
import { createUser, setIsloading } from '../app/AuthSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { AUTH_USER_URL, LOGIN_USER_URL } from '../utils/urls';

export const handleRegister = (values: any, dispatch: Dispatch) => {
  dispatch(setIsloading(true));
  nonTokenInstance
    .post(AUTH_USER_URL, values)
    .then(async (res) => {
      const loginPayload = {
        email: values.email,
        password: values.password,
      };
      console.log(res.data);
      localStorage.setItem('id', res.data.id);

      try {
        const res = await nonTokenInstance.post(LOGIN_USER_URL, loginPayload);
        const parsedResponse = JSON.parse(res.data);

        const tokens = {
          access_token: parsedResponse.Token,
          refresh_token: parsedResponse.RefreshToken,
        };

        const user = {
          email: parsedResponse.Email,
          fullName: parsedResponse.FullName,
        };

        localStorage.setItem('tokens', JSON.stringify(tokens));
        localStorage.setItem('id', parsedResponse.UserId);
        dispatch(createUser(user));

        toast.success('You have successfully registered and logged in');
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      if (err.message === 'Network Error') {
        toast.error('It seems you are not connected to the Internet');
      }
      if (err.response?.data) {
        toast.error(err.response.data);
      }
    });
  dispatch(setIsloading(false));
};
