import React from 'react';
import { Checkbox } from '../../../../components/index.js';

const ThreeQues = ({ q1, q2, q3, setQ1, setQ2, setQ3 }) => {
    return (
        <div className='my-8'>
            <h3 className='font-jost text-lg font-bold text-gray-700'>
                Just Answer
            </h3>
            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:my-4 flex flex-col py-1 sm:*:mx-2'>
                <Checkbox
                    text='Have You ever been disqualified ?'
                    checked={q1}
                    onChange={() => {
                        setQ1((prev) => !prev);
                    }}
                />
                <Checkbox
                    text='Are you appearing in two examinations simulatneously ?'
                    checked={q2}
                    onChange={() => {
                        setQ2((prev) => !prev);
                    }}
                />
                <Checkbox
                    text='Have you applied for re-evevaluation of lower examination ?'
                    checked={q3}
                    onChange={() => {
                        setQ3((prev) => !prev);
                    }}
                />
            </div>
        </div>
    );
};

export default ThreeQues;
