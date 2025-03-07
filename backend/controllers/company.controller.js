import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerComapny = async (req,res)=>{
    try {
        const {companyName} = req.body
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success :false 
            })
        }
        let company = await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message:"Company already exists",
                success :false
            })
        }
       company = await Company.create({
        name:companyName,
        userId:req.id
        })

        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success :true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        
        const companies = await Company.find({userId: userId });

        if (!companies.length) {
            return res.status(404).json({ message: "No companies found", success: false, companies: [] });
        }

       
        return res.status(200).json({ companies, success: true });
    } catch (error) {
        console.error("Error fetching companies from backend:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
}; 

export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id 
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

       
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        }

        
        company.name = name || company.name;
        company.description = description || company.description;
        company.website = website || company.website;
        company.location = location || company.location;

       
        if (file) {
            const fileUri = getDataUri(file)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "image",
                access_mode: "public",
            });

            if (!cloudResponse.secure_url) {
                return res.status(500).json({ message: "Cloudinary upload failed", success: false });
            }

            company.logo = cloudResponse.secure_url;
        }

       
        await company.save();

        return res.status(200).json({
            message: "Company information updated",
            company,
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", success: false });
    }
};
