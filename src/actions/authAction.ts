"use server"

import { getAccessToken } from "@/utils/server-only";
import { cookies } from "next/headers";

type TSignInState = {
    success: boolean,
    message: string,
    redirectUrl: string | null,
}


export const SignUserInAction = async (prev: TSignInState, formdata: FormData) => {

    const userCredential = {
        username: formdata.get("username") as string,
        password: formdata.get("password") as string
    }


    const url = `${process.env.API_URL}/api/user/auth/login`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userCredential)
        })

        const { success, message, token } = await response.json();

        (await cookies()).set("accessToken", token, {
            httpOnly: true,
            path: "/",
        })

        return {
            success,
            message,
            redirectUrl: response.status === 200 ? "/blog" : null,
        }
    } catch {
        return {
            success: false,
            message: "Error Occured!",
            redirectUrl: null,
        }
    }
}



export const checkLogInStatus = async () => {

    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/auth`;

    try {
        const response = await fetch(url, {
            cache: "no-store",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const { success, message, user} = await response.json();

        return {
            success: success,
            message: message,
            user: user
        }
    } catch {
        return {
            success: false,
            message: "Error occured!",
            user: null
        }
    }
}

export const currentUser = async () => {

    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/current-user`;

    try {
        const response = await fetch(url, {
            cache: "no-store",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const { success, message, user} = await response.json();

        return {
            success: success,
            message: message,
            user: user
        }
    } catch {
        return {
            success: false,
            message: "Error occured!",
            user: null
        }
    }
}