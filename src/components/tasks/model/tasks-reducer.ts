import {todolistId1, todolistId2, todolistId3} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {TaskPriority, TaskStatus, TaskType} from "@/api/todolists-api.ts";

export const removeToodolistAC = createAction<{ todolistId: string }>('REMOVE_TODOLIST')
export const addToodolistAC = createAction<{ todolistId: string, title: string }>('ADD_TODOLIST')
export const addTaskAC = createAction<{ todolistId: string, title: string }>('ADD_TASK')
export const removeTaskAC = createAction<{ id: string, todolistId: string }>('REMOVE_TASK')
export const changeTitleTaskAC = createAction<{ todolistId: string, title: string, id: string }>('CHANGE_TASK_TITLE')
export const changeTaskStatusAC = createAction<{ todolistId: string, id: string, status: TaskStatus }>('CHANGE_TASK_STATUS')

export type TasksStateType = { [key: string]: TaskType[]; };

const initialState: TasksStateType = {
    [todolistId1]: [
        {
            id: nanoid(),
            title: 'CSS',
            status: TaskStatus.Complete,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'HTML',
            status: TaskStatus.Complete,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'JS',
            status: TaskStatus.Complete,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Redux',
            status: TaskStatus.New,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
    ],
    [todolistId2]: [
        {
            id: nanoid(),
            title: 'Milk',
            status: TaskStatus.New,
            todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Snickers',
            status: TaskStatus.New,
            todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Book',
            status: TaskStatus.Complete,
            todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Bread',
            status: TaskStatus.Complete,
            todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
    ],
    [todolistId3]: [
        {
            id: nanoid(),
            title: 'Apple',
            status: TaskStatus.New,
            todoListId: todolistId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Notebook',
            status: TaskStatus.Complete,
            todoListId: todolistId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Juice',
            status: TaskStatus.New,
            todoListId: todolistId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Headphones',
            status: TaskStatus.New,
            todoListId: todolistId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Backpack',
            status: TaskStatus.Complete,
            todoListId: todolistId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        },
        {
            id: nanoid(),
            title: 'Pen',
            status: TaskStatus.New,
            todoListId: todolistId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Low,
            description: ''
        }
    ]
}
export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(addToodolistAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
        .addCase(removeToodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(addTaskAC, (state, action) => {
            const {todolistId, title} = action.payload;
            if (!state[todolistId]) {
                state[todolistId] = [];
            }
            state[todolistId].unshift({
                id: nanoid(),
                title,
                status: TaskStatus.New,
                todoListId: todolistId,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriority.Low,
                description: ''
            });
        })
        .addCase(removeTaskAC, (state, action) => {
            const {todolistId, id} = action.payload;
            if (state[todolistId]) {
                const index = state[todolistId].findIndex(task => task.id === id);
                if (index !== -1) {
                    state[todolistId].splice(index, 1);
                }
            }
        })
        .addCase(changeTitleTaskAC, (state, action) => {
            const {todolistId, title, id} = action.payload;
            if (state[todolistId]) {
                const task = state[todolistId].find(task => task.id === id);
                if (task) {
                    task.title = title;
                }
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const {todolistId, id, status} = action.payload;
            if (state[todolistId]) {
                const task = state[todolistId].find(task => task.id === id);
                if (task) {
                    task.status = status;
                }
            }
        })
})
