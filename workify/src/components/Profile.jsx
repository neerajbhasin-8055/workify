import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Edit from '../assets/edit.svg?react'
import Button from './ui/button'
import Mail from '../assets/mail.svg?react'
import Phone from '../assets/phone.svg?react'
import Badge from './ui/badge'
import ApplicationTable from './ApplicationTable'
import UpdateProfileDailog from './UpdateProfileDailog '
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs()
    const isResume = true
    const { user } = useSelector(store => store.auth) 

    const [open, setOpen] = useState(false)
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-200  rounded-2xl p-8 my-5'>
                <div className='flex gap-4 items-center justify-between'>
                    <div className='flex gap-6 items-center'>
                        <div>
                            <img src={user?.profile?.profilePhoto} className='w-25 h-20 rounded-full'></img>
                        </div>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='text-gray-600 text-sm'>{user?.profile?.bio}</p>
                        </div>
                    </div>

                    <Button onClick={() => setOpen(true)} variant='outline' className='w-10 flex items-center justify-center'>
                        <img onClick={() => setOpen(true)} src={Edit}></img>
                    </Button>
                </div>
                <div className='flex flex-col gap-2 my-4'>
                    <div className='flex gap-3 my-2'>
                        <img src={Mail}></img>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex gap-3 my-2'>
                        <img src={Phone}></img>
                        <span>{user?.phoneNumber}</span>
                    </div></div>
                <div className='flex flex-col gap-3 my-3'>
                    <h1>Skills</h1>
                    <div className='flex gap-2'>
                        {
                            user?.profile?.skills.map((item, index) => <Badge className='border border-gray-600' key={index}>{item}</Badge>)
                        }
                    </div>

                </div>
                <div className='grid w-full max-w-sm items-center gap-2'>
                    <h1 className=' font-bold text-xl'>Resume</h1>
                    {
                        isResume ? <a target='_blank' href={user?.profile?.resume}>
                            {user?.profile?.resumeOriginalName}
                        </a> : <span>NA</span>
                    }

                </div>

            </div>
            <div className='max-w-7xl mx-auto bg-white rounded-full my-4'>
                <ApplicationTable />
            </div>
            <UpdateProfileDailog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
