import { getCategoriesOrTask, addOrUpdate} from "./fetch-api.js";
const apiDefaultUrl = "http://localhost:8080/todo/";

export function saveCategories(object, type, userRequestUrl) {
    return addOrUpdate(object, type, apiDefaultUrl + userRequestUrl);
}

export function getCategories(userRequestUrl) {
    return getCategoriesOrTask(apiDefaultUrl + userRequestUrl);
}

export function saveTask(object, type, userRequestUrl) {
    return addOrUpdate(object, type, apiDefaultUrl + userRequestUrl);
}

export function getTask(userRequestUrl) {
    return getCategoriesOrTask(apiDefaultUrl + userRequestUrl);
}