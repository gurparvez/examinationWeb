import {NavLink} from "react-router-dom";

const Card = ({
    id="",
    href="#",
    heading="Heading",
    recpt="",
    submittedAt="2024-02-25",
    className=""
}) => {
    return (
        <div className={`${className}`} key={id}>
            <NavLink to={href}
                     className={`block w-56 xxs:w-64 xs:max-w-80 h-36 p-6 bg-white border border-gray-200 rounded-lg shadow-xl hover:bg-gray-200 hover:scale-105 transition-all ease-in-out duration-300`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{heading}</h5>
                <p className="font-normal text-gray-700">Receipt Number: {recpt}</p>
                <p className="font-normal text-gray-700 ">Submitted at: {submittedAt}</p>
            </NavLink>
        </div>
    )
}

export default Card