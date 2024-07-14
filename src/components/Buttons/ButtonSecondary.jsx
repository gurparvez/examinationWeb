// eslint-disable-next-line react/prop-types
import { InlineLoadingCircle } from '../index.js';

const ButtonSecondary = ({
    data = 'click',
    type = 'button',
    bg = 'bg-white',
    textColor = 'text-black',
    border = 'border border-primary',
    isLoading = false,
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            className={`${bg} ${textColor} ${border} hover:bg-[#E7A503] hover:text-white w-auto rounded px-3 py-2 transition-all ease-in-out hover:cursor-pointer ${className}`}
            {...props}>
            {isLoading ? <InlineLoadingCircle /> : data}
        </button>
    );
};

export default ButtonSecondary;
