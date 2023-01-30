export function addOrUpdate(object, type, userRequestUrl) {
    if (type == "POST") {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(object),
            redirect: 'follow'
        };
        return fetch(userRequestUrl, requestOptions)
            .then(response => {
                return response.json()
            });
    }
}

export function getCategoriesOrTask(userRequestUrl) {
    return fetch(userRequestUrl)
        .then(response => { return response.json(); });
}







