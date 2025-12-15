import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import clerkWebHooks from "./controllers/webHooks.js";
import companyRouter from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';

// initialize express app
const app = express()

// connect to DB
await connectDB()

// connect to cloudinary
await connectCloudinary()

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.get('/', (req, res) => res.send("API Working"))

// test route to trigger an error for Sentry
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// all routes
app.use("/api/company", companyRouter);

// clerk webhooks
app.post("/webHooks", clerkWebHooks)

// port
const PORT = process.env.PORT || 5000;

// Sentry request handler
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});