import React from 'react';

const ShowError = ({ error = '', classname = 'text-red-600', ...props }) => {
    return (
        <p className={`${classname}`} {...props}>
            {error}
        </p>
    );
};

export default ShowError;
