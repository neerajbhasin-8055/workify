import React from 'react'
import LatestJobCards from './LatestJobCards'
const randomJobs = [1,2,3,4,5,6,7,8,9]
const LatestJobs = () => {
  return (
    <div className='mx-auto max-w-7xl my-20'>
     <h1 className='text-3xl font-medium'>Latest and <span className='text-gray-600 font-bold'>New Job</span> Openings.</h1>

     <div className='grid grid-cols-3 gap-6 my-5'>
        {
            randomJobs.slice(0,6).map((item,index)=> <LatestJobCards/>)
        }
     </div>
    </div>
  )
}

export default LatestJobs
