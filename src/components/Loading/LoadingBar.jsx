import React from 'react';

const LoadingBar = ({ classname = '' }) => {
    return (
        <div
            className={`absolute left-0 top-0 h-[3px] w-full animate-pulse bg-red-600 duration-200 ${classname}`}
        ></div>
    );
};

export default LoadingBar;
