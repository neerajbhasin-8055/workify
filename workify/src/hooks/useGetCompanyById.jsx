import React, { useEffect } from 'react'
import axios from 'axios'

import { COMPANIES_API_END_POINT} from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { setSingleCompany } from '../redux/companySlice'
const useGetCompanyById = ({companyId}) => {
const dispatch = useDispatch()
    useEffect(()=>{
        const fetchSingleCompany = async ()=>{
            try {
                const res = await axios.get(`${COMPANIES_API_END_POINT}/getJob/{companyId}`,{withCredentials:true})
                if (res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany()
    },[companyId,dispatch])
}

export default useGetCompanyById
