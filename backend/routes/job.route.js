import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getAdminJobs, getAllJobs, jobById, postJob } from "../controllers/job.controller.js"

const router = express.Router()

router.route('/postjob').post(isAuthenticated,postJob)
router.route('/getjob').get(isAuthenticated,getAllJobs)
router.route('/getjob/:id').get(isAuthenticated,jobById)
router.route('/adminjobs').get(isAuthenticated,getAdminJobs)

export default router