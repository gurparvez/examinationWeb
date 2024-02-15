import React from 'react';

const LoadingBar = ({classname=''}) => {
  return (
    <div className={`absolute top-0 left-0 w-full h-[3px] bg-red-600 animate-pulse duration-200 ${classname}`}></div>
  );
}

export default LoadingBar;
