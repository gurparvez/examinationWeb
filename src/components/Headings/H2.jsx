import React from 'react';

const H2 = ({ classname, children }) => {
    return (
        <h2 className={`font-jost text-xl font-bold ${classname}`}>
            {children}
        </h2>
    );
};

export default H2;
