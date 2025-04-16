import {useEffect, useState} from 'react'
import {todolistsApi} from "@/api/todolists-api.ts";

export const AppHttpRequests = () => {

    const [state, setState] = useState<any>(null)

    const getTodolist = () => {

        useEffect(() => {
            todolistsApi.getTodolists()
                .then((res) => {
                    setState(res.data)
                })
        }, [])

        return <>{JSON.stringify(state)}</>
    }
    const createTodolist = (title: string) => {

        useEffect(() => {
            todolistsApi.postTodolist(title)
                .then((res) => {
                    setState(res.data)
                })
        }, [])
        return <>{JSON.stringify(state)}</>
    }
    const deleteTodolist = (id: string) => {

        useEffect(() => {
            todolistsApi.deleteTodolist(id)
            .then((res) => {
                setState(res.data)
            })
        }, []);
        return <>{JSON.stringify(state)}</>
    }
    const changeTodolistTitle = (id: string, title: string) => {

        useEffect(() => {
            todolistsApi.changeTodolist(id, title)
                .then((res) => {
                    setState(res.data)
                })
        }, [])
        return <>{JSON.stringify(state)}</>
    }

    const getTask = (todolistId: string) => {

        useEffect(() => {
            todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
        }, [])
        return <>{JSON.stringify(state)}</>
    }
    const deleteTask = (todolistId: string, taskId: string) => {

        useEffect(() => {
            todolistsApi.deleteTasks(todolistId, taskId)
                .then((res) => {
                    setState(res.data)
                })
        },[])
        return <>{JSON.stringify(state)}</>
    }
    const createTask = (todolistId: string, title: string) => {

        useEffect(() => {
            todolistsApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
        }, [])
        return <>{JSON.stringify(state)}</>
    }
    const updateTaskTitle = (todolistId: string, taskId: string, description: string, priority: number, title: string, status: number) => {

        useEffect(() => {
            todolistsApi.updateTasks(todolistId, taskId, {
                deadline: "",
                description: description,
                priority: priority,
                startDate: "",
                status: status,
                title: title,
            })
            .then((res) => {
                setState(res.data)
            })
        }, [])
        return <>{JSON.stringify(state)}</>
    }
}