import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { apply, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"

const router = express.Router()

router.route('/apply/:id').get(isAuthenticated, apply)
router.route('/getAppliedJobs').get(isAuthenticated, getAppliedJobs)
router.route('/:id/applicants').get(isAuthenticated, getApplicants)
router.route('/status/:id/update').post(isAuthenticated, updateStatus)

export default router