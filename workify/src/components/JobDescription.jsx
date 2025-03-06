import React from 'react';
import Button from './ui/button';
import Badge from './ui/badge';

const JobDescription = () => {
    const isApplied = true
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Software Engineer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-gray-500 font-bold'} variant="ghost">5 Positions</Badge>
                        <Badge className={'text-gray-700 font-bold'} variant="ghost">Full-time</Badge>
                        <Badge className={'text-gray-900 font-bold'} variant="ghost">20 LPA</Badge>
                    </div>
                </div>
                <Button
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
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Software Engineer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Bangalore, India</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>We are looking for a talented software engineer to join our team.</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>3+ yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>20 LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>150</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>2024-03-05</span></h1>
            </div>
        </div>
    );
}

export default JobDescription;
