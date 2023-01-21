const apiDefaultUrl = "http://localhost:8080/todo/";


export async function addCategories(category, type, userRequestUrl) {
    if (type == "POST") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(category),
            redirect: 'follow'
        };
        const response = await fetch(apiDefaultUrl + userRequestUrl, requestOptions);
        const addedCategoryId = await response.json();
        return addedCategoryId;
    }
}

export async function getCategories(userRequestUrl) {
    const response = await fetch(apiDefaultUrl + userRequestUrl);
    const categories = await response.json();
    return categories;
}

export async function savedTask(task, type, userRequestUrl) {
    console.log("add task method")
    if (type == "POST") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(task),
            redirect: 'follow'
        };
        const response = await fetch(apiDefaultUrl + userRequestUrl, requestOptions);
        const addedTaskId = await response.json();
        console.log("addedTaskId : " + addedTaskId);
        return addedTaskId;
    }
}

export async function getTask(userRequestUrl) {
    const response = await fetch(apiDefaultUrl + userRequestUrl);
    const tasks = await response.json();
    return tasks;
}






