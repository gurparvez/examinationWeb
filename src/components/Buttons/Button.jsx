import { InlineLoadingCircle } from '../index.js';

const Button = ({
    data = 'click',
    type = 'button',
    bg = 'bg-primary',
    bgHover = 'bg-secondary',
    textColor = 'text-white',
    border = 'border-none',
    isLoading = false,
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            className={`${isLoading ? bgHover : bg} ${textColor} ${border} hover:${bgHover} w-auto rounded px-3 py-2 transition-all ease-in-out hover:cursor-pointer ${className}`}
            {...props}>
            {isLoading ? <InlineLoadingCircle /> : data}
        </button>
    );
};

export default Button;
