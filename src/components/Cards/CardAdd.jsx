import { NavLink } from 'react-router-dom';

const CardAdd = ({ href = '', classname = '', ...props }) => {
    return (
        <div className={`${classname}`} {...props}>
            <NavLink
                to={href}
                className={`block h-36 w-56 rounded-lg border-gray-200 bg-white shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 xs:max-w-80`}
            >
                <div className='flex h-full w-full items-center justify-center rounded-lg border-4 border-dashed hover:border-white'>
                    <p className='text-6xl font-bold text-gray-400'>+</p>
                </div>
            </NavLink>
        </div>
    );
};

export default CardAdd;
