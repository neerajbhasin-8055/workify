import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
    const {allJobs} = useSelector(store=>store.job)
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-5'>
                <div className='flex gap-6'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        allJobs.length === 0 ? (
                            <span>No job found</span>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-6'>
                                    {
                                        allJobs.map((job) => (
                                            <Job key={job?._id} job={job} />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;
