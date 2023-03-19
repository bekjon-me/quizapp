import React, { useEffect } from 'react';

export default function Result({
  result,
  length,
}: {
  result: number;
  length: number;
}) {
  const [percentage, setPercentage] = React.useState(0);

  useEffect(() => {
    setPercentage(Math.round((result / length) * 100));
  }, [result, length]);
  return (
    <div className='container'>
      <h2 className='text-center'>Result</h2>
      <p className='text-center'>
        Your score is {result} / {length}
      </p>
      <p className='text-center'>Your percentage is {percentage} %</p>
      {percentage >= 80 ? (
        <p className='text-center'>You are a genius</p>
      ) : percentage >= 60 ? (
        <p className='text-center'>You are a good student</p>
      ) : percentage >= 40 ? (
        <p className='text-center'>You are a normal student</p>
      ) : (
        <p className='text-center'>You are a bad student</p>
      )}
    </div>
  );
}
