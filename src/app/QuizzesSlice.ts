import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from 'react-redux-typescript';
import { Quiz, quizzes, Project } from './@types.data';
import { RootState } from './store';

// init state
const initialState = {
  quizzes: [],
} as quizzes;

const QuizzesSlice = createSlice({
  // name used in action types
  name: 'quizzes',
  // initial state
  initialState,
  // an object of "case reducers"
  // key names are used to generate actions
  reducers: {
    addQuiz: (state: quizzes, action: PayloadAction<string, Quiz>) => {
      state.quizzes.push(action.payload);
    },
    setQuizzes: (
      state: quizzes,
      action: PayloadAction<string, Quiz[] | Quiz>
    ) => {
      if (Array.isArray(action.payload)) {
        state.quizzes = action.payload;
      } else {
        state.quizzes.push(action.payload);
      }
    },
  },
});

export const { addQuiz, setQuizzes } = QuizzesSlice.actions;
export default QuizzesSlice.reducer;

// create and export the selector
export const selectQuizzes = (state: RootState) => state.quizzes;
