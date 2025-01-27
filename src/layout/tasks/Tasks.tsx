import {Task} from "./task/Task.tsx";
import {useState} from "react";

export type FilterValuesType = "all" | "completed" | "active"

export const Tasks = () => {
    const [tasks, setTasks] = useState(
        [
            {id: 1, title: 'CSS', isDone: true},
            {id: 2, title: 'HTML', isDone: false},
            {id: 3, title: 'JS', isDone: true},
            {id: 4, title: 'Redux', isDone: true},
        ]
    )
    const [filter, setFilter] = useState<FilterValuesType>("all")

    let taskForToDoList = tasks;
    if (filter === "completed") {
        taskForToDoList = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        taskForToDoList = tasks.filter(t => !t.isDone);
    }

    const removeTask = (id: number) => {
        let filtredTasks = tasks.filter(t => t.id !== id)
        setTasks(filtredTasks);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    return (
        <>
            <Task changeFilter={changeFilter} title="What to learn" tasks={taskForToDoList} removeTask={removeTask}/>
        </>
    )
};

