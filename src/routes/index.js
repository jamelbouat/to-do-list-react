import Tasks from "../components/Tasks";
import Task from "../components/Task";

const routes = [
    {
        path: '/tasks',
        exact: true,
        component: Tasks
    },
    {
        path: '/task',
        exact: true,
        component: Task
    }

]
