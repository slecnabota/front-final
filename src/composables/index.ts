import {ILogin, IRegister, ISetTask, ITask} from "../interfaces";
// @ts-ignore
import Service from "../service";
import {onMounted, ref} from "vue";

export function TaskApp() {
    const modalVisible = ref(false);
    const tasks = ref<ITask[]>([])
    const categories = ref<any[]>([])
    const editingRows = ref([])
    const currentPage = ref(0)
    const totalElements = ref<number>(0)
    const select = ref<ISetTask>({
        title: '',
        description: '',
        dueDate: '',
        status: '',
        categoryId: 0,
        priority: 0,
    })

    const clearSelect = () => {
        select.value.title = ''
        select.value.description = ''
        select.value.dueDate = ''
        select.value.status = ''
        select.value.categoryId = 0
        select.value.priority = 0
    }

    async function register(user: IRegister) {
        return await Service.register(user).then(response => {
            return response;
        });
    }

    async function login(user: ILogin) {
        return await Service.login(user).then(response => {
            console.log(response);
            if (response.status === 200) {
                console.log(response.data.users)
                localStorage.setItem('user', JSON.stringify(response.data.users));
                localStorage.setItem('token', JSON.stringify(response.data.token))
            }
            return response;
        });
    }

    function getUser() {
        const user = localStorage.getItem("user");
        return JSON.parse(user) || null;
    }

    function getToken() {
        return JSON.parse(localStorage.getItem("token"));
    }

    function isAuthenticated() {
        return !!getToken();
    }

    async function logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'))
    }


    const getTasks = (page: number) => {
        console.log(getUser())
        Service.getTasksByUser(getUser().id, page).then(response => {
            console.log(response)
            totalElements.value = response.data.totalElements
            tasks.value = response.data.content
        })
    }

    const updateTask = (task: ITask) => {
        console.log(task)
        Service.updateTask({...task, userId: getUser().id}).then(response => {
            console.log(response)
            getTasks(currentPage.value)
        })
    }

    const getCategories = () => {
        Service.getCategories().then(response => {
            console.log(response)
            categories.value = response.data
        })
    }

    const addTask = async (task: ITask, file: File | null) => {
        console.log(file)
        if (file) {
            const reader = new FileReader();

            reader.onload = async () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const byteArray = Array.from(new Uint8Array(arrayBuffer));

                const taskWithPhoto = {
                    ...task,
                    dueDate: new Date(task.dueDate).toLocaleDateString(),
                    userId: getUser().id,
                    photo: byteArray,
                };

                try {
                    const response = await Service.addTask(taskWithPhoto);
                    console.log("Task created:", response.data);
                    getTasks(currentPage.value);
                    clearSelect();
                } catch (error) {
                    console.error("Error creating task:", error);
                }
            };

            reader.onerror = () => {
                console.error("Failed to read file");
            };

            reader.readAsArrayBuffer(file);
        } else {
            console.log('here wrong')
        }
    };


    const confirmDelete = (id: string) => {
        Service.deleteTask(id).then(response => {
            console.log(response)
            getTasks(currentPage.value)
        })
    }

    const toggleModal = () => {
        console.log('click')
        modalVisible.value = !modalVisible.value;
        if (!modalVisible.value) {
            clearSelect()
        }
    }

    const rowEditSave = ({newData}: any) => {
        const categoryId = newData.category.id
        delete newData.category
        delete newData.user
        updateTask({...newData, categoryId: categoryId})
    }

    const rowEditInit = ({data}: any) => {
        console.log(data)
    }


    return {
        editingRows,
        rowEditInit,
        select,
        tasks,
        register,
        login,
        logout,
        isAuthenticated,
        getToken,
        getUser,
        addTask,
        rowEditSave,
        confirmDelete,
        toggleModal,
        modalVisible,
        getCategories,
        categories,
        totalElements,
        getTasks,
        currentPage,
    }
}