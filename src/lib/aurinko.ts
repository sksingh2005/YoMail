"use server"

import { auth } from "@clerk/nextjs/server"

export const getAurinkoAuthURL=async(serviceType: 'Google' | 'Office365')=>{   
    const {userId}=await auth();

    if(!userId) throw new Error('User not authenticated');

    const params=new URLSearchParams({
        client_id:process.env.AURINKO_CLIENT_ID as string,
        serviceType,
        scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
        response_type: 'code',
        returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
    });

    return `https://api.aurinko.io/v1/auth/authroize?${params.toString()}`;

}