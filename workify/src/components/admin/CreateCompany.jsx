import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Label from '../ui/label'
import Input from '../ui/input'
import Button from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANIES_API_END_POINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setSingleCompany } from '../../redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [companyName , setCompanyName] = useState()
    const registerNewCompany = async () => {
        if (!companyName) {
            toast.error("Company name is required");
            return;
        }
    
        try {
            const res = await axios.post(
                `${COMPANIES_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
    
    
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
    
                if (companyId) {
                    navigate(`/admin/companies/${companyId}`);
                } else {
                    toast.error("Company ID not found.");
                }
            } else {
                toast.error(res?.data?.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error registering company:", error);
            toast.error(error?.response?.data?.message || "Failed to register company.");
        }
    };
    
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto '>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name</p>
                </div>

                <Label className='mt-10'>
                    Company name
                </Label>
                <Input type='text'
                    placeholder='Type your company name'
                    className='my-2' 
                    onChange={(e)=>setCompanyName(e.target.value)}/>
                    <div className='flex items-center gap-3 my-6'>
                    <Button className="px-4" variant='outline' onClick={()=>navigate('/admin/companies')}>
                       Cancel 
                    
                    </Button>
                    <Button onClick={registerNewCompany} className='px-4 !bg-black'>
                       Continue
                    </Button>

                    </div>
                    

            </div>
        </div>
    )
}

export default CreateCompany
