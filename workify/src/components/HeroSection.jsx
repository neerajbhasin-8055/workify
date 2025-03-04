import React from 'react'
import Input from './ui/input'
import { Search } from "lucide-react";
import Button from './ui/button';
const HeroSection = () => {
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-4 mt-4'>
                <h2 className='text-gray-900 font-medium mx-auto ' >No More Job Hunt Fatigue – Let’s Get You Hired!</h2>

                <h1 className='text-3xl font-medium'>Find, Apply, Succeed.<br /> Land Your <span className='text-gray-600 font-bold'>Next Job</span> Here.</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus eligendi asperiores, id quia repellat blanditiis.</p>
            </div>
            <div className='flex w-[40%] mt-10 border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <Input className='shadow-lg focus:outline-none focus:ring-gray-800 focus:border-gray-800 px-4 py-4 text-black hover:border-gray-800 rounded-full'
                    type='text'
                    placeholder="Search your dream job here"
                />
                <Button className=" flex items-center justify-center w-[10%] bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
                    <Search  size={28} />
                </Button>
            </div>

        </div>
    )
}

export default HeroSection
