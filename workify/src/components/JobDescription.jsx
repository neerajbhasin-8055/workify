import React, { useEffect, useState } from 'react';
import Button from './ui/button';
import Badge from './ui/badge';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT,APPLICATION_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import Navbar from './shared/Navbar';
import { toast } from 'react-toastify';
import Footer from './Footer';

const JobDescription = () => {
 
    const {singleJob}  = useSelector(store=>store.job)
    const {user} = useSelector(store=>store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied,setIsApplied] = useState(isInitiallyApplied)

       
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    
    const applyJobHandler = async ()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
            if(res.data.success){
                setIsApplied(true)
                const updatedSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob))
                toast.status(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  
   useEffect(() => {
    const fetchSingleJob = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getJob/${jobId}`, { withCredentials: true });
            console.log("Fetched Job:", res.data.job);
console.log("Applications:", res.data.job.applications);


            if (res.data.success) {
                dispatch(setSingleJob(res.data.job));

                // Ensure applications are an array of objects before checking
               const hasApplied = res.data.job.applications.some(application => {
    const applicantId = typeof application.applicant === 'string' ? application.applicant : application.applicant?._id;
    return applicantId === user?._id;
});

                setIsApplied(hasApplied);
                toast.success(res.data.message); // not toast.status

            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchSingleJob();
}, [jobId, dispatch, user?._id]);


    return (
        <>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-gray-500 font-bold'} variant="ghost">{singleJob?.position}</Badge>
                        <Badge className={'text-gray-700 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-gray-900 font-bold'} variant="ghost">{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button 
                onClick={isApplied ? null : applyJobHandler}
                variant='outline'
                    disabled={isApplied}
                    className={`px-4 rounded-lg ${isApplied ? 'bg-black text-white cursor-not-allowed hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200 hover:text-black'
                        }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>

            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
        <Footer/>
        </>
        
    );
}

export default JobDescription;
