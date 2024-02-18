import React, { useEffect, useState } from 'react'
import { profile } from '../assets'
import { useSelector } from 'react-redux'

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
      setProfileImage(userData.avatar || '')
    }
  }, [])

  return (
    <div>
      <div></div>
    </div>
  )
}

export default Profile