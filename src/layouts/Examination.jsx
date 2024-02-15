import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Input } from '../components'
import { profile } from '../assets'

const Examination = () => {

  const {register, handleSubmit} = useForm()

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

  const submitForm = async (data) => {}

  return (
    <div className='px-14 py-8'>
      <h1 className='text-xl font-bold'>Personal Info :</h1>
      <div className='bg-gray-200 rounded-lg'>
        <div className='flex flex-row'>
          <div className='w-1/2 p-5 *:py-2'>
            <form onSubmit={handleSubmit(submitForm)} className='*:my-7 px-2 rounded-xl bg-white'>
              <Input label="AUID" value={auid} />
              <Input label="Candidate's Name" value={fullName} />
              <Input label="Father's Name" value={fatherName} />
              <Input label="Mother's Name" value={motherName} />
              <Input label="Mobile Number" value={phoneNumber} />
              <Input label="Email" value={email} />
            </form>
          </div>
          <div className='w-1/2 p-5 flex items-center justify-center'>
            <img src={profileImage} alt="Profile Image" className='w-full' />
          </div>
        </div>
        {/* <div className='px-4'>
          <Input label="Present Address" value={address} />
        </div> */}
      </div>
    </div>
  )
}

export default Examination