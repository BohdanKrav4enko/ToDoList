import {Task} from "./task/Task.tsx";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {AddItemForm} from "../AddItemForm.tsx";

export type FilterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export const Tasks = () => {
        let todolistId1 = uuidv4()
        let todolistId2 = uuidv4()
        let todolistId3 = uuidv4()

        let [todolists, setTodolists] = useState<Array<TodolistType>>([
            {id: todolistId1, title: 'What to learn', filter: "all"},
            {id: todolistId2, title: 'What to buy', filter: "all"},
            {id: todolistId3, title: 'Shopping List', filter: "all"}
        ])

        let [tasksObj, setTasksObj] = useState({
            [todolistId1]: [
                {id: uuidv4(), title: 'CSS', isDone: true},
                {id: uuidv4(), title: 'HTML', isDone: false},
                {id: uuidv4(), title: 'JS', isDone: false},
                {id: uuidv4(), title: 'Redux', isDone: false},
            ],
            [todolistId2]: [
                {id: uuidv4(), title: 'Milk', isDone: true},
                {id: uuidv4(), title: 'Snickers', isDone: false},
                {id: uuidv4(), title: 'Book', isDone: true},
                {id: uuidv4(), title: 'Brad', isDone: true},
            ],
            [todolistId3]: [
                { id: uuidv4(), title: 'Apple', isDone: false },
                { id: uuidv4(), title: 'Notebook', isDone: true },
                { id: uuidv4(), title: 'Juice', isDone: false },
                { id: uuidv4(), title: 'Headphones', isDone: true },
                { id: uuidv4(), title: 'Backpack', isDone: false },
                { id: uuidv4(), title: 'Pen', isDone: true }
            ]
        });

        const addTask = (title: string, todolistId: string) => {
            const newTask = {id: uuidv4(), title: title, isDone: false};
            const tasks = tasksObj[todolistId];
            tasksObj[todolistId] = [newTask, ...tasks]
            setTasksObj({...tasksObj});
            changeFilter('all', todolistId)
        }
        const removeTask = (id: string, todolistId: string) => {
            const tasks = tasksObj[todolistId]
            let filteredTasks = tasks.filter(t => t.id !== id)
            tasksObj[todolistId] = filteredTasks
            setTasksObj({...tasksObj});
        }
        const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
            const tasks = tasksObj[todolistId]
            const task = tasks.find(t => t.id === taskId)
            if (task) {
                task.title = title;
            }
            setTasksObj({...tasksObj})
        }

        const changeToDoListTitle = (title: string, id: string) => {
            const todolist = todolists.find(tl => tl.id === id)
            if (todolist) {
                todolist.title = title
                setTodolists([...todolists])
            }
        }

        const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
            const tasks = tasksObj[todolistId]
            const task = tasks.find(t => t.id === taskId)
            if (task) {
                task.isDone = isDone;
            }
            setTasksObj({...tasksObj})
        }
        const changeFilter = (value: FilterValuesType, todolistId: string) => {
            const todolist = todolists.find(t => t.id === todolistId);
            if (todolist) {
                todolist.filter = value;
                setTodolists([...todolists])
            }
        }
        const removeTodolist = (todolistId: string) => {
            const filtredTodolist = todolists.filter(t => t.id !== todolistId)
            setTodolists([...filtredTodolist])
            delete tasksObj[todolistId]
            setTasksObj({...tasksObj})
        }

        const addTodoList = (title: string) => {
            const todolist: TodolistType = {id: uuidv4(), filter: "all", title: title}
            setTodolists([todolist, ...todolists]);
            setTasksObj({...tasksObj, [todolist.id]: []});
        }


        return <>
            <AddItemForm addItem={addTodoList}/>
            {todolists.map((tl) => {
                let taskForToDoList = tasksObj[tl.id];
                if (tl.filter === "completed") {
                    taskForToDoList = tasksObj[tl.id].filter(t => t.isDone);
                }
                if (tl.filter === "active") {
                    taskForToDoList = tasksObj[tl.id].filter(t => !t.isDone);
                }
                return <Task changeToDoListTitle={changeToDoListTitle} changeTaskTitle={changeTaskTitle} removeTodolist={removeTodolist} id={tl.id} key={tl.id}
                             changeStatus={changeStatus}
                             addTask={addTask}
                             changeFilter={changeFilter} title={tl.title} tasks={taskForToDoList}
                             removeTask={removeTask} filter={tl.filter}/>
            })}

        </>
    }
;

