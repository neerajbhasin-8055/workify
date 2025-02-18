import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getCompany, getCompanyById, registerComapny, updateCompany } from "../controllers/company.controller.js"
const router = express.Router()

router.route('/register').post(isAuthenticated,registerComapny)
router.route('/getCompany').get(isAuthenticated,getCompany)
router.route('/getCompany/:id').get(isAuthenticated,getCompanyById)
router.route('/update/:id').put(isAuthenticated,updateCompany)

export default router