import React, { useEffect, useState } from 'react'
import { profile } from '../assets'
import { useSelector } from 'react-redux'
import { Button, Input } from '../components'

const Profile = () => {

  const [auid, setAuid] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [address, setAddress] = useState('')
  const [profileImage, setProfileImage] = useState(profile)

  const user = useSelector(state => state.auth.userData);
  const userData = user.user

  useEffect(() => {
    if (userData) {
      setAuid(userData.auid || '')
      setFullName(userData.fullName || '')
      setPhoneNumber(userData.phoneNumber || '')
      setEmail(userData.email || '')
      setFatherName(userData.fatherName || '')
      setMotherName(userData.motherName || '')
      setAddress(userData.address || '')
      setProfileImage(userData.avatar || profile)
    }
  }, [])

  return (
    <div className='w-full flex py-10 px-3 xs:px-16 justify-center bg-yellow-200'>
      <div className='w-[95%] xs:w-[75%] border border-red-900 rounded-3xl bg-home shadow-2xl'>
        <div className='h-16 xxs:h-24 sm:h-36 flex justify-center my-5'>
          <div className='relative'>
            <img src={profileImage} alt="image" className='h-full aspect-[3/4] object-cover border border-primary rounded-2xl shadow-2xl' />
            <form className='absolute h-fit p-2 xs:p-3 bg-gray-300 rounded-full -end-5 -bottom-4 border border-white hover:cursor-pointer'>
              <svg className='h-fit w-5 xxs:w-8' fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 487 487" xml:space="preserve" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9 v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"></path> </g> </g> </g></svg>
            </form>
          </div>
        </div>
        <div className='my-2 px-3 xxs:px-6'>
          <div className='px-2 xxs:px-4 mb-5 border border-red-700 bg-white rounded-xl'>
            <div className='mt-4'>
              <h3 className='text-primary font-jost font-bold'>About You</h3>
              <h1 className='text-3xl font-jost font-semibold '>Your Profile</h1>
            </div>
            <div className='py-3'>
              <form className='border-t border-b border-red-700 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2'>
                <div className=''>
                  <Input label="Auid" value={auid} />
                  <Input label="Name" value={fullName} />
                </div>
                <div className=''>
                  <Input label="Father's Name" value={fatherName} />
                  <Input label="Mother's Name" value={motherName} />
                </div>
                <div className=''>
                  <Input label="Contact Number" value={phoneNumber} />
                  <Input label="Email" value={email} />
                </div>
                <div className=''>
                  <Input label="Address" value={address} />
                </div>
              </form>
              <div className='*:mx-3 mt-2'>
                <Button data='Password' />
                <Button data='Save' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile