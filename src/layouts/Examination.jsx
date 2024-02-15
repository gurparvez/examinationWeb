import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Input } from '../components'
import { profile } from '../assets'
import Popoup from '../components/Popoup'

const Examination = () => {

  const {register, handleSubmit} = useForm()
  const [ispopup, setIspopup] = useState(false)

  const [auid, setAuid] = useState()
  const [fullName, setFullName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()
  const [fatherName, setFatherName] = useState()
  const [motherName, setMotherName] = useState()
  const [address, setAddress] = useState()
  const [profileImage, setProfileImage] = useState(profile)
  
  const user = useSelector(state => state.auth.userData);
  const userData = user.user
  useEffect(() => {
    if (userData) {
      setAuid(userData.auid)
      setFullName(userData.fullName)
      setPhoneNumber(userData.phoneNumber)
      setEmail(userData.email)
      setFatherName(userData.fatherName)
      setMotherName(userData.motherName)
      setAddress(userData.address)
      setProfileImage(userData.avatar)
    }
  }, [])

  const changeInput = () => {
    setIspopup(true)
  }

  return (
    <div className='px-6 xs:px-10 sm:px-14 py-8'>
      <h1 className='text-xl font-bold'>Personal Info :</h1>
      <div className='bg-gray-200 rounded-lg'>
        <div className='flex flex-col-reverse sm:flex-row'>
          <div className='w-full sm:w-1/2 p-5 *:py-2'>
            <form onSubmit={(e) => {e.preventDefault()}} className='*:my-7 px-2 rounded-xl bg-white'>
              <Input label="AUID" value={auid} onChange={changeInput} />
              <Input label="Candidate's Name" value={fullName} onChange={changeInput} />
              <Input label="Father's Name" value={fatherName} onChange={changeInput} />
              <Input label="Mother's Name" value={motherName} onChange={changeInput} />
              <Input label="Mobile Number" value={phoneNumber} onChange={changeInput} />
              <Input label="Email" value={email} onChange={changeInput} />
            </form>
          </div>
          <div className='w-full sm:w-1/2 p-5 flex items-center justify-center'>
            <img src={profileImage} alt="Profile Image" className='w-full' />
          </div>
        </div>

        {ispopup && (
          <Popoup setIspopup={setIspopup} Heading='Error !' Content='If you wish to make changes, you have to do it in your profile' />
        )}
      </div>
    </div>
  )
}

export default Examination