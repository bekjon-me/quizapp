import React from 'react';
import { useAuth } from '../../hooks/UseAuth';
import './Loader.css';

export default function Loader() {
  const { isLoading } = useAuth();
  return (
    <div
      className='loaderWrapper'
      style={{
        display: isLoading ? 'flex' : 'none',
      }}
    >
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
