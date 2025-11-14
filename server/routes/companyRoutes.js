import express from "express";
import { registerNewCompany, loginCompany, getCompanyData, postNewJob, getCompanyJobApplicants, getCompanyPostedJobs, changeApplicationStatus, changeJobVisibility } from "../controllers/companyController.js";

const router = express.Router();

// register a company
router.post('/register', registerNewCompany)

// login company
router.post('/login', loginCompany)

// company data
router.post('/company', getCompanyData)

// post new job
router.post('/post-job', postNewJob)

// job applicants
router.post('/applicants', getCompanyJobApplicants)

// all jobs list
router.post('/list-jobs', getCompanyPostedJobs)

// application status
router.post('/change-status', changeApplicationStatus)

// job visibility
router.post('/change-visibility', changeJobVisibility)

export default router;