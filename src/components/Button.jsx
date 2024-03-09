// eslint-disable-next-line react/prop-types
const Button = ({
  data = "click",
  type = "button",
  bg="bg-primary",
  bgHover="bg-secondary",
  textColor="text-white",
  border="border-none",
  className="",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${bg} ${textColor} ${border} hover:${bgHover} w-auto rounded py-2 px-3 hover:cursor-pointer transition-all ease-in-out ${className}`}
      {...props}
    >
      {data}
    </button>
  )
}

export default Button