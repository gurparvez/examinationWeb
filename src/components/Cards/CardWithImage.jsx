const CardWithImage = ({
    link = '#',
    image,
    heading = 'Noteworthy technology acquisitions 2021',
    para = 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order',
    imageClass = 'w-full',
}) => {
    return (
        <>
            <a
                href={link}
                target='_blank'
                className='block max-w-sm rounded-lg border border-gray-200 bg-[#f1f7fe] p-6 shadow transition-all hover:scale-105 hover:bg-white hover:shadow-2xl'
            >
                <div className='my-3 flex w-full justify-center'>
                    {image && (
                        <img
                            src={image}
                            alt='image'
                            className={`${imageClass}`}
                        />
                    )}
                </div>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                    {heading}
                </h5>
                <p className='font-normal text-gray-700'>{para}</p>
            </a>
        </>
    );
};

export default CardWithImage;
