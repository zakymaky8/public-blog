"use server"

import { TAuthor } from "@/app/_lib/type";

type TSignUpState = {
    success: boolean,
    message: string,
    redirectUrl: string | null,
    user: TAuthor | null
}

export const SignUpAction = async (prev: TSignUpState, formdata: FormData) => {

    const url = `${process.env.API_URL}/api/user/auth/register`;
    console.log(url)

    const userData = {
        firstname: formdata.get("firstname") as string,
        lastname: formdata.get("lastname") as string,
        username: formdata.get("username") as string,
        password: formdata.get("password") as string as string,
        confirm_password: formdata.get("confirm_password") as string
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const { success, message, user } = await response.json()
        return {
            success,
            message,
            redirectUrl: response.status === 201 ? "/login" : null,
            user
        }
    } catch {
        return {
            success: false,
            message: "Error Occured!",
            redirectUrl: null,
            user: null
        }
    }




}