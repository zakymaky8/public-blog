"use server"

import { getAccessToken } from "@/utils/server-only"



export const updateProfileAction = async (formdata: FormData) => {
    const url = `${process.env.API_URL}/api/user/user-profile`
    const token = await getAccessToken();

    const formData = new FormData();
    const profilePic = formdata.get("profilePic") as File;
    formData.append("profilePic", profilePic);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const { success, message, user } = await response.json();
        return { success, message, user };

    } catch {
        return {
            success: false,
            message: "Error Occured!",
            user: null
        }
    }
}



export const updateProfileInfoAction = async (userId: string, formdata: FormData) => {
    const url = `${process.env.API_URL}/api/user/user-profile/${userId}`
    const token = await getAccessToken()

    const userInfo = {
        firstname: formdata.get("firstname") as string,
        lastname: formdata.get("lastname") as string,
        username: formdata.get("username") as string,
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userInfo)
        })
        const { success, message } = await response.json();
        return { success, message };

    } catch {
        return {
            success: false,
            message: "Error Occured!",
        }
    }
}