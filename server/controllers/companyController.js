import bcrypt from "bcrypt";
import Company from "../models/company.js";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";

// register new company
const registerNewCompany = async (req, res) => {
    const { name, email, password } = req.body;

    const image = req.file;

    if(!name || !email || !password || !image){
        return res.json({ success: false, message: "All fields are required" });
    }

    // if user already exists
    try{
        const existingCompany = await Company.findOne({ email });
        if(existingCompany){
            return res.json({ success: false, message: "Company already registered" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // uploading image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(image.path)

        const company = await Company.create({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true, message: "Company registered successfully",
            company: {
                id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        });


    } catch(err){
        res.json({ success: false, message: "Error registering company", error: err.message });
    }
}

// company login
const loginCompany = async (req, res) => {

}

// get company data
const getCompanyData = async (req, res)  => {

}

// post new job
const postNewJob = async (req, res) => {

}

// company job applicants
const getCompanyJobApplicants = async (req, res) => {

}

// get company posted jobs
const getCompanyPostedJobs = async (req, res) => {

}

// change job application status
const changeApplicationStatus = async (req, res) => {

}

// change job visibility
const changeJobVisibility = async (req, res) => {
    
}

export {
    registerNewCompany,
    loginCompany,
    getCompanyData,
    postNewJob,
    getCompanyJobApplicants,
    getCompanyPostedJobs,
    changeApplicationStatus,
    changeJobVisibility
}