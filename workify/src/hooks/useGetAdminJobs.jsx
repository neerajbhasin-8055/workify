import React, { useEffect } from 'react'
import axios from 'axios'

import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs, setAllJobs } from '../redux/jobSlice'
const useGetAllAdminJobs = () => {
const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllAdminJobs = async ()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/adminjobs`,{withCredentials:true})
                if (res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllAdminJobs()
    },[])
}

export default useGetAllAdminJobs;