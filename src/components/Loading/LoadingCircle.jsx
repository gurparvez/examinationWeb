import React from 'react';

const LoadingCircle = () => {
    return (
        <div className='absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center'>
            <div className='h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-yellow-500'></div>
        </div>
    );
};

export default LoadingCircle;
