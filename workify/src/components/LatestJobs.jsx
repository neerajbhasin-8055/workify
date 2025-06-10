import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import store from '../redux/store'


const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job)
 
  return (
    <div className='mx-auto max-w-7xl my-20'>
     <h1 className='text-3xl font-medium'>Latest and <span className='text-gray-600 font-bold'>New Job</span> Openings.</h1>

     <div className='grid grid-cols-3 gap-6 my-5'>
        {
          allJobs.length<=0?<span>No job Found</span> :allJobs.slice(0,6).map((job)=> <LatestJobCards  key={job._id} job={job}/>)
        }
     </div>
    </div>
  )
}

export default LatestJobs
