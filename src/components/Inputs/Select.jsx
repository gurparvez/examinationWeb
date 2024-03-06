import React from "react";

const Select = ({
    heading="Select an option",
    options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ],
    value="option 1",
    onChange,
}) => {
    return(
        <div className="mx-auto w-full">
            <select id="countries"
                    defaultValue={options[0]}
                    value={value}
                    onChange={onChange}
                    className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
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
    )
}

export default Select