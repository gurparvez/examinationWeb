import React from 'react';

const Select = ({
    heading = 'Select an option',
    options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ],
    value = 'option 1',
    onChange,
}) => {
    return (
        <div className='mx-auto w-full'>
            <select
                id='countries'
                defaultValue={options[0]}
                value={value}
                onChange={onChange}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            >
                <option selected>{heading}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
                {/*<option value="US" selected>United States</option>*/}
                {/*<option value="CA">Canada</option>*/}
                {/*<option value="FR">France</option>*/}
                {/*<option value="DE">Germany</option>*/}
            </select>
        </div>
    );
};

export default Select;
