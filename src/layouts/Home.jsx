import React from 'react';
import { home1 } from '../assets';
import { aboutUniversity, announcements, testimonials } from '../constants';
import CardWithImage from '../components/Cards/CardWithImage.jsx';
import { Button } from '../components/index.js';
function Home() {
    return (
        <>
            <div className='flex flex-col justify-evenly bg-home px-3 py-4 xs:px-6 ss:px-9 lg:flex-row'>
                <img
                    src={home1}
                    alt='about'
                    className='aspect-[33/26] rounded-[50px] object-cover p-[15px] lg:w-[50%]'
                />
                <div className='p-[15px] lg:w-[50%]'>
                    <h3 className='font-jost text-[18px] font-bold text-primary'>
                        {aboutUniversity[0].heading}
                    </h3>
                    <h1 className='font-jost text-[50px] font-semibold leading-tight'>
                        {aboutUniversity[0].title}
                    </h1>
                    <p className='font-jost text-[18px] font-semibold leading-7 text-p'>
                        {aboutUniversity[0].info1}
                    </p>
                    <p className='font-jost text-[16px] font-medium leading-7 text-content'>
                        {aboutUniversity[0].info2}
                    </p>
                    <div className='my-[5px] xs:m-[10px] ss:m-[15px]'>
                        <ul className='flex flex-col flex-wrap *:flex *:max-w-full *:flex-row *:py-2 ss:flex-row *:ss:max-w-[50%]'>
                            {aboutUniversity[0].content.map((card) => (
                                <li key={card.id}>
                                    <div className='max-h-[55px] rounded-full bg-primary px-[18px] py-[15px] font-bold text-white'>
                                        {card.id}
                                    </div>
                                    <div className='px-[16px]'>
                                        <h2 className='text-xl font-bold'>
                                            {card.title}
                                        </h2>
                                        <p className='text-content'>
                                            {card.content}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full px-3 py-4 xs:px-6 ss:px-9'>
                <div className='mt-4 flex justify-center'>
                    <a href='https://auts.ac.in/announcement/' target='_blank'>
                        <Button data='View All Announcements' />
                    </a>
                </div>
                <div className='p-[15px]'>
                    <h3 className='font-jost text-[18px] font-bold text-primary'>
                        {announcements[0].heading}
                    </h3>
                    <h1 className='font-jost text-[50px] font-semibold leading-tight'>
                        {announcements[0].title}
                    </h1>
                </div>
                <div className='flex w-full flex-col flex-wrap items-center justify-center *:m-2 xs:flex-row'>
                    {announcements[0].contentCard.map((card) => (
                        <CardWithImage
                            heading={card.title}
                            para={card.content}
                            image={card.image}
                            link={card.readMore}
                        />
                    ))}
                </div>
            </div>
            <div className='w-full bg-secondary'>
                <div className='flex flex-col items-center font-jost text-white *:py-7 sm:flex-row sm:justify-evenly'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-6xl font-semibold'>1400</h1>
                        <div>STUDENTS AT AU</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-6xl font-semibold'>700</h1>
                        <div>ALUMNI</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-6xl font-semibold'>100</h1>
                        <div>HIGHLY QUALIFIED TEACHERS</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-6xl font-semibold'>2015</h1>
                        <div>STARTED FROM</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-3 py-4 xs:px-6 ss:px-9'>
                <div className='p-[15px]'>
                    <h3 className='font-jost text-[18px] font-bold text-primary'>
                        {testimonials[0].heading}
                    </h3>
                    <h1 className='font-jost text-[50px] font-semibold leading-tight'>
                        {testimonials[0].title}
                    </h1>
                </div>
                <div className='flex w-full flex-col flex-wrap justify-center *:m-2 xs:flex-row'>
                    {testimonials[0].contentCard.map((card) => (
                        <CardWithImage
                            heading={card.title}
                            para={card.content}
                            image={card.image}
                            imageClass='rounded-[50%] w-28 h-28 object-cover'
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
