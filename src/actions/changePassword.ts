"use server"

import { getAccessToken } from "@/utils/server-only"

interface IPwdChangeState {
    success: boolean,
    message: string,
    redirectUrl: string | null
}



export const changeUserPassword = async (prev: IPwdChangeState, formdata: FormData) => {
    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/user/change_password`;

    const userInps = {
        oldpwd: formdata.get("old_pwd"),
        newpwd: formdata.get("new_pwd")
    }
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(userInps)
        })

        const { success, message } = await response.json()

        return {
            success: success,
            message: message,
            redirectUrl: [401, 403].includes(response.status) ? "/login" : null
        }
    } catch {
        return {
            success: false,
            message: "Error Occured!",
            redirectUrl: null,
        }
    }

}