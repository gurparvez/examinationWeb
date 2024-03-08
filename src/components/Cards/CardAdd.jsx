import {NavLink} from "react-router-dom";

const CardAdd = ({
    href="",
    classname="",
    ...props
 }) => {
    return (
        <div className={`${classname}`} {...props}>
            <NavLink to={href} className={`block w-56 xxs:w-64 xs:max-w-80 h-36 bg-white border-gray-200 rounded-lg shadow-xl hover:bg-gray-200 hover:scale-105 transition-all ease-in-out duration-300`}>
                <div className='flex justify-center items-center w-full h-full border-dashed rounded-lg border-4 hover:border-white'>
                    <p className='text-6xl text-gray-400 font-bold'>+</p>
                </div>
            </NavLink>
        </div>
    )
}

export default CardAdd