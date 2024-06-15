import React from 'react';

const H1 = ({ classname, children }) => {
    return (
        <h2 className={`font-jost text-3xl font-bold ${classname}`}>
            {children}
        </h2>
    );
};

export default H1;
