import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            });
        }

        // Upload file to Cloudinary
        let profilePhotoUrl = "";
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
                access_mode: "public",
            });
            profilePhotoUrl = cloudResponse.secure_url;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create the user with profilePhoto directly
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto: profilePhotoUrl } 
        });

        return res.status(201).json({
            message: "Account created successfully",
            user: newUser,
            success: true
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        if (user) {
            const matchedPassword = await bcrypt.compare(password, user.password)
            if (!matchedPassword) {
                return res.status(400).json({
                    message: "Incorrect email or password",
                    success: false
                })
            }
            // check role is correct or not

            if (role != user.role) {
                return res.status(400).json({
                    message: "Account does not exist with the selected role, try selecting other roles",
                    success: false
                })
            }
            const tokenData = {
                userId: user._id
            }
            const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

            user = {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
            return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            })
        }
    } catch (error) {
        consol.log("Error: ", error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body
        // console.log(fullname, email, phoneNumber, bio, skills)
        const file = req.file 
        const fileUri = getDataUri(file) 
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "raw",  // Ensures it's treated as a raw file (PDF)
            folder: "resumes", // Optional folder for organization
            access_mode: "public", // Ensures file is accessible
            public_id: "resume_for_accenture", // Sets a meaningful name
            format: "pdf" // Ensures the correct file extension
        });
        
        
        
        let skillsArray;
        if(skills){
            skillsArray = skills.split(',')
        }
        
        const userId = req.id // middleware authentication
        let user = await User.findById(userId )
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        // updating data
        if(fullname)user.fullname = fullname
        if(email)user.email = email
        
        if(phoneNumber)user.phoneNumber = phoneNumber
        
        if(bio) user.profile.bio = bio
        
        if(skills)user.profile.skills = skillsArray
        const image = req.file
        
        
           

        if (cloudResponse){
            // console.log(cloudResponse.secure_url)
            user.profile.resume = cloudResponse.secure_url // Resume ka link jo cloudinary se ayega 
            user.profile.resumeOriginalName = file.originalname
        }
        await user.save()

        user = {
            id :user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role :user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile Updated successfully",
            user,
            success:true
        })
    } catch (error) {
        console.log("Error: ", error)
    }
}