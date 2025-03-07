import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { COMPANIES_API_END_POINT } from '../utils/constant';
import { setAllCompanies } from '../redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANIES_API_END_POINT}/getCompany`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies));
                } else {
                    console.warn("No companies found:", res.data);
                }
            } catch (error) {
                console.error("Error fetching companies from frontend:", error.response?.data || error.message);
            }
        };

        fetchCompanies();
    }, []);
};

export default useGetAllCompanies;
