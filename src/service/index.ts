import {ILogin, IRegister, ITask} from "../interfaces";
import {addTask, deleteTask, getCategories, getTasksByUser, login, register, updateTask} from "../api";

class Service {
    public register(user: IRegister) {
        return register(user).then(response => {
            return response
        })
    }

    public login(user: ILogin) {
        return login(user).then(response => {
            return response
        })
    }

    public getTasksByUser(userId: string, page: number) {
        return getTasksByUser(userId, page).then(response => {
            return response
        })
    }

    public addTask(task: ITask) {
        console.log(task)
        return addTask(task).then(response => {
            return response
        })
    }

    public updateTask(task: ITask) {
        return updateTask(task).then(response => {
            return response
        })
    }

    public deleteTask(taskId: string) {
        return deleteTask(taskId).then(response => {
            return response
        })
    }

    public getCategories() {
        return getCategories().then(response => {
            return response
        })
    }
}

export default new Service()