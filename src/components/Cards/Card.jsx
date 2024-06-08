import { NavLink } from 'react-router-dom';

const Card = ({
    id = '',
    href = '#',
    heading = 'Heading',
    recpt = '',
    submittedAt = '2024-02-25',
    className = '',
}) => {
    return (
        <div className={`${className}`} key={id}>
            <NavLink
                to={href}
                className={`block h-36 w-56 rounded-lg border border-gray-200 bg-white p-6 shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 xxs:w-64 xs:max-w-80`}
            >
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                    {heading}
                </h5>
                <p className='font-normal text-gray-700'>
                    Receipt Number: {recpt}
                </p>
                <p className='font-normal text-gray-700'>
                    Submitted at: {submittedAt}
                </p>
            </NavLink>
        </div>
    );
};

export default Card;
