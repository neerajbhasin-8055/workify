import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"
export const apply = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({
                message: "No job found",
                success: false
            })
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(400).json({
                message: "No job found",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            // status:"pending"
        })

        job.applications.push(newApplication._id);
        await job.save()
        return res.status(200).json({
            message: "Applied for the job successfully",
            newApplication,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        })
        if (!applications) {
            return res.status(400).json({
                message: "no application found for this user",
                success: false
            })
        }
        return res.status(200).json({
            applications,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Fetch job details with applicants populated
        const job = await Job.findById(jobId)
            .lean()  // Convert Mongoose object to plain JSON
            .populate({
                path: 'applications',
                options: { sort: { createdAt: -1 } }, // Correct sorting inside populate
                populate: { path: 'applicant' }
            });

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(400).json({
                message: "Application not found",
                success: false
            })
        }

        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}