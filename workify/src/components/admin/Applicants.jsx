import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllApplicants = async () =>{
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
        if (res.data.success){
dispatch(setAllApplicants(res.data.job))
        }
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchAllApplicants()
  },[])
  return (
    <div >
     <Navbar/>
     <div className='max-w-7xl mx-auto my-5'>

        <ApplicantsTable/>
     </div>
    </div>
  )
}

export default Applicants
