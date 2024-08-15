import React from 'react';

const H3 = ({ classname, children }) => {
    return <h3 className={`font-jost font-bold ${classname}`}>{children}</h3>;
};

export default H3;
