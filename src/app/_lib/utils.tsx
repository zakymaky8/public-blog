export const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};


export function cap(word: string):string {
    return word[0].toUpperCase() + word.slice(1,).toLowerCase()
  }


export function formateDate(dateInp:Date) {
    const dateInDate = new Date(dateInp);
    const strDate = `${dateInDate}`;
    const splitCpt = strDate.split(" ").slice(1, 4)
    splitCpt[1] += ","
    return splitCpt.join(" ")
}


export function getTheday(dateInp: Date) {
    const timess =  `${(new Date(dateInp))}`.split(" ");
    return timess[0] + ", " + timess[4]
}

export function decideWhichFormat(dateInp: Date) {
    const now = Date.now();
    const creationTime = new Date(dateInp);
    const creationTimeStamp = creationTime.getTime();
    const diff = (now / 86400000) - (creationTimeStamp / 86400000)

    if (diff >= 7) {
        return formateDate(dateInp)
    }
    if (diff < 7) {
        return getTheday(dateInp)
    }
}


export function isNew(dateInp: Date) {
    const now = Date.now();
    const creationTime = new Date(dateInp);
    const creationTimeStamp = creationTime.getTime();
    const diff = (now / 86400000) - (creationTimeStamp / 86400000)

    return diff > 7 ? false : true
}



export const formatApiUrl = (
    api_url: string | undefined,
    path: string,
    page?: string | number,
    search?: string,
    limit?: string | number,
    status?: string | number

  ) => {



    const possibleParams = {search, page, limit, "filter.status": status}
    const pairs = Object.entries(possibleParams);

    const urlParams = new URLSearchParams("");

    for (const pair of pairs) {
      if (pair[1] !== undefined) urlParams.set(pair[0], pair[1] as string)
      continue
    }

    const queryParams = urlParams.toString() ? `?${urlParams.toString()}` : ""
    return (new URL(path+queryParams, api_url)).toString()
}
