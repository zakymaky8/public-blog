"use server"

export async function validateRegistration(formData: FormData) {

    const errors: string[] = [];

    const userData = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        username: formData.get("username"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
      }

    const pwdchecks = {
        are_nums: /[0-9]/.test(`${userData.password}`),
        are_lowers: /[a-z]/.test(`${userData.password}`),
        are_uppers: /[A-Z]/.test(`${userData.password}`),
        are_spe_chars: /^[0-9a-zA-Z]/.test(`${userData.password}`)
    }

    if (`${userData.username}`.length < 5 || `${userData.username}`.length > 10) {
        errors.push("Username must be between 5 and 10 characters!")
    }

    if (!pwdchecks.are_nums) {
        errors.push("Password must contain atleast one number")
    }


    if (!pwdchecks.are_lowers) {
        errors.push("Password must contain atleast one lowercase")
    }

    if (!pwdchecks.are_uppers) {
        errors.push("Password must contain atleast one uppercase")
    }


    if (!pwdchecks.are_spe_chars) {
        errors.push("Password must contain atleast one special character")
    }


    if (`${userData.password}`.length < 8) {
        errors.push("Password characters cannot be less than 8")
    }

    if (`${userData.password}` !== `${userData.confirm_password}`){
        errors.push("Password did't match")
    }


    return {errors, userData}
}