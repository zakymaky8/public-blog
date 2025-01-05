export const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};


export function cap(word: string):string {
    return word[0].toUpperCase() + word.slice(1,).toLowerCase()
  }
  