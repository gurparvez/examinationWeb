import React from 'react'

const ShowError = ({
    error="",
    classname="",
    ...props
}) => {
  return (
    <p className={`text-red-600 ${classname}`} {...props}>
        {error}
    </p>
  )
}

export default ShowError