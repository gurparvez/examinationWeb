import React from 'react';

const LoadingCircle = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div className='border-t-4 border-blue-500 w-16 h-16 border-solid rounded-full animate-spin'></div>
    </div>
  );
}

export default LoadingCircle;
