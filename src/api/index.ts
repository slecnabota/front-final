import {ILogin, IRegister, ITask} from "../interfaces";
import axios from "axios";
import {TaskApp} from "../composables";

const {getToken} = TaskApp()

export function register(user: IRegister) {
    return axios.post("/register", user).then(response => response, error => error)
}

export function login(user: ILogin) {
    return axios.post("/login", user).then(response => response, error => error)
}

export function getTasksByUser(userId: string, page: number) {
    const token = getToken();
    return axios.get(`/tasks/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: page
        }
    })
}

export function addTask(task: ITask) {
    const token = getToken();
    return axios.post(`/tasks`, task, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function updateTask(task: ITask) {
    const token = getToken();
    return axios.put(`/tasks/${task.id}`, task, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function deleteTask(taskId: string) {
    const token = getToken();
    return axios.delete(`/tasks/${taskId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function getCategories() {
    const token = getToken();
    return axios.get(`/categories`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}