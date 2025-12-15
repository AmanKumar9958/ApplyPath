import express from "express";
import { registerNewCompany, loginCompany, getCompanyData, postNewJob, getCompanyJobApplicants, getCompanyPostedJobs, changeApplicationStatus, changeJobVisibility } from "../controllers/companyController.js";
import upload from "../config/multer.js";

const CompanyRouter = express.Router();

// register a company
CompanyRouter.post('/register', upload.single('image'), registerNewCompany)

// login company
CompanyRouter.post('/login', loginCompany)
// company data
CompanyRouter.post('/company', getCompanyData)

// post new job
CompanyRouter.post('/post-job', postNewJob)

// job applicants
CompanyRouter.post('/applicants', getCompanyJobApplicants)

// all jobs list
CompanyRouter.post('/list-jobs', getCompanyPostedJobs)

// application status
CompanyRouter.post('/change-status', changeApplicationStatus)

// job visibility
CompanyRouter.post('/change-visibility', changeJobVisibility)

export default CompanyRouter;