const CardWithImage = ({
    link = "#",
    image,
    heading = "Noteworthy technology acquisitions 2021",
    para="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order",
    imageClass = ""
}) => {
    return (
        <>
            <a href={link} target="_blank"
               className="block max-w-sm p-6 bg-[#f1f7fe] border border-gray-200 rounded-lg shadow hover:shadow-2xl hover:bg-white hover:scale-105 transition-all">
                <div className="w-full flex justify-center my-3">
                    {image && <img src={image} alt="image" className={`w-full ${imageClass}`}/>}
                </div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{heading}</h5>
                <p className="font-normal text-gray-700">{para}</p>
            </a>
        </>
    )
}

export default CardWithImage