import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-5'>
                <div className='flex gap-6'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        jobsArray.length === 0 ? (
                            <span>No job found</span>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-6'>
                                    {
                                        jobsArray.map((job, index) => (
                                            <Job key={index} />
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
