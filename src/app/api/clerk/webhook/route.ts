//api/clerk/webhook

import { db } from "@/server/db";

export const POST=async (req:Request)=>{
    const {data}=await req.json();
    console.log('webhook data received',data);
    const firstName=data.first_name;
    const lastname=data.last_name;
    const email=data.email_addresses[0].email_address;
    const imageUrl=data.image_url;
    const id=data.id;

    const insertUser=await db.user.create({
        data:{
            id,
            firstName,
            lastname,
            email,
            imageUrl
        }
    });
    console.log('usser created ')
    return new Response ('webhook data received',{status:200});
}