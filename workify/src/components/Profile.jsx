import React from 'react'
import Navbar from './shared/Navbar'

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-200  rounded-2xl p-8 my-5'>
                <div className='flex gap-4 items-center'>
                    <div>
                        <img src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg" className='w-25 h-20'></img>
                    </div>
                    <div>
                        <h1 className='font-medium text-xl'>Full name</h1>
                        <p className='text-gray-600 text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi similique rem, fugit nostrum rerum harum?</p>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Profile
