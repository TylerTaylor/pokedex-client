export function loginUser(loginParams) {
    const body = JSON.stringify(loginParams)
    
    return fetch("https://mysterious-island-27050.herokuapp.com/login", {
        method: 'post',
        body: body,
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    })
        .then((res) => res.json())

}