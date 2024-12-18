import {createRouter, createWebHistory} from "vue-router";
// @ts-ignore
import LoginView from '../pages/auth/LoginView.vue'
import RegisterView from '../pages/auth/RegisterView.vue'
import TasksContent from "../pages/tasks/TasksContent.vue";
import {TaskApp} from "../composables";

const routes = [
    {path: "/register", name: "Register", component: RegisterView},
    {path: "/login", name: "Login", component: LoginView},
    {path: "/tasks", name: "MainPage", component: TasksContent, meta: {requiresAuth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const {isAuthenticated} = TaskApp()
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({name: "Login"});
    } else {
        next();
    }
});
export default router;
