"use server"

async function getData(ipp:number) {
    const arr = [];
    for (let i = 0; i< 100; i++) {
        arr.push({
            id: i+1,
            title: "web loggers title",
            content: "something is as bla bla as somebody I know is. so bla bla is my thing anyway. so some body might be that and we are kin that could mean any of like that okey oh god this txt is making me fill dizzy",
            commentAmt: i + 1
        })
    }
    return {allData: arr, sliced: arr.slice(0, ipp)};
}


// const postData = async function() {
//     await fetch("http://localhost:3456/data", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify({NAME: "ZEKI", body: "data received"})
//     })
// }

// postData()

export {getData}