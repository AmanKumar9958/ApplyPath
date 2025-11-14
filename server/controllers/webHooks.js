import { messageInRaw, Webhook } from "svix";
import user from "../models/User.js";
import { json } from "express";

// Manage clerk user with database
const clerkWebHooks = async (req, res) => {
    try{
        // create instance with webhook
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // very headers
        await wh.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // getting data from req body
        const { data, type } = req.body   // data -> payload data, type -> create/update/delete

        switch (type){
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ""
                }
                await user.create(userData)
                res.json({})
                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await user.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case "user.deleted": {
                await user.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;
        }
    } catch (error){
        console.log(error.message);
        res.json({success:false, message:"WebHooks error"})
    }
}

export default clerkWebHooks;