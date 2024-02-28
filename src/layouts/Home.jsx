import React, {useEffect} from 'react'
import { home1 } from '../assets'
import {aboutUniversity, api} from '../constants'
import {Loader} from "../components";
import useApi from "../API/useApi.js";
import {useDispatch, useSelector} from "react-redux";
import {put} from '../store/formSlice.js'

function Home() {
    const {apiData, response, isLoading, progress, error} = useApi('get');
    const dispatch = useDispatch()
    const forms = useSelector(state => state.form.formsData);

    useEffect(() => {
        async function fetchData() {
            await apiData(api.allForms)
        }
        if (!forms) fetchData()
    }, []);

    useEffect(() => {
        if(response){
            console.log(response)
            dispatch(put(response.data[0].forms))
        }
    }, [response, error]);

  return (
      isLoading ? <Loader/> :
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
  )
}

export default Home