import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    requirements:[{
        type:String,
        require:true
    }],
    salary:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    jobType:{
        type:String,
        require:true
    },
    experienceLevel:{
        type:Number,
        require:true
    },
    position:{
        type:Number,
        require:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]
},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema)