import React from 'react'
import { home1 } from '../assets'
import {aboutUniversity, announcements, testimonials} from '../constants'
import CardWithImage from "../components/Cards/CardWithImage.jsx";
import {Button} from "../components/index.js";
function Home() {

  return (
      <>
          <div className='flex lg:flex-row flex-col py-4 px-3 xs:px-6 ss:px-9 bg-home justify-evenly'>
              <img src={home1} alt="about" className='lg:w-[50%] p-[15px] rounded-[50px] object-cover aspect-[33/26]'/>
              <div className='lg:w-[50%] p-[15px]'>
                  <h3 className='text-[18px] text-primary font-bold font-jost'>{aboutUniversity[0].heading}</h3>
                  <h1 className='text-[50px] font-semibold font-jost leading-tight'>{aboutUniversity[0].title}</h1>
                  <p className='text-p font-jost text-[18px] leading-7 font-semibold'>{aboutUniversity[0].info1}</p>
                  <p className='text-content font-jost text-[16px] leading-7 font-medium'>{aboutUniversity[0].info2}</p>
                  <div className='ss:m-[15px] xs:m-[10px] my-[5px]'>
                      <ul className='flex ss:flex-row flex-col flex-wrap *:flex *:flex-row *:ss:max-w-[50%] *:py-2 *:max-w-full'>
                          {aboutUniversity[0].content.map((card) => (
                              <li key={card.id}>
                                  <div
                                      className='bg-primary max-h-[55px] text-white font-bold py-[15px] px-[18px] rounded-full'>{card.id}</div>
                                  <div className='px-[16px]'>
                                      <h2 className='text-xl font-bold'>{card.title}</h2>
                                      <p className='text-content'>{card.content}</p>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
          <div className="w-full py-4 px-3 xs:px-6 ss:px-9">
              <div className="flex justify-center mt-4">
                  <a href="https://auts.ac.in/announcement/" target='_blank'>
                      <Button data="View All Announcements"/>
                  </a>
              </div>
              <div className="p-[15px]">
                  <h3 className='text-[18px] text-primary font-bold font-jost'>{announcements[0].heading}</h3>
                  <h1 className='text-[50px] font-semibold font-jost leading-tight'>{announcements[0].title}</h1>
              </div>
              <div className="w-full flex flex-wrap items-center justify-center flex-col xs:flex-row *:m-2">
                  {
                      announcements[0].contentCard.map((card) => (
                          <CardWithImage heading={card.title} para={card.content} image={card.image} link={card.readMore}/>
                      ))
                  }
              </div>
          </div>
          <div className="w-full bg-secondary">
              <div className="flex *:py-7 text-white font-jost sm:justify-evenly flex-col sm:flex-row items-center">
                  <div className="flex flex-col items-center">
                      <h1 className="font-semibold text-6xl">1400</h1>
                      <div>STUDENTS AT AU</div>
                  </div>
                  <div className="flex flex-col items-center">
                      <h1 className="font-semibold text-6xl">700</h1>
                      <div>ALUMNI</div>
                  </div>
                  <div className="flex flex-col items-center">
                      <h1 className="font-semibold text-6xl">100</h1>
                      <div>HIGHLY QUALIFIED TEACHERS</div>
                  </div>
                  <div className="flex flex-col items-center">
                      <h1 className="font-semibold text-6xl">2015</h1>
                      <div>STARTED FROM</div>
                  </div>
              </div>
          </div>
          <div className="w-full py-4 px-3 xs:px-6 ss:px-9">
              <div className="p-[15px]">
                  <h3 className='text-[18px] text-primary font-bold font-jost'>{testimonials[0].heading}</h3>
                  <h1 className='text-[50px] font-semibold font-jost leading-tight'>{testimonials[0].title}</h1>
              </div>
              <div className="w-full flex flex-wrap justify-center flex-col xs:flex-row *:m-2">
                  {
                      testimonials[0].contentCard.map((card) => (
                          <CardWithImage heading={card.title} para={card.content} image={card.image} imageClass="rounded-[50%] w-28 h-28 object-cover" />
                      ))
                  }
              </div>
          </div>
      </>
  )
}

export default Home