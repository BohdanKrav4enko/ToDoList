import {FilterValuesType} from "../Tasks.tsx";
import {
    TaskContainer,
    StyledList,
    StyledTaskFooter,
    StyledNotes,
    TaskTitle,
    TaskTitleButton, StyledErrorText, StyledInputContainer, StyledInput, TaskItem,
} from "./TaskStyles.tsx";
import {ButtonTask} from "../../ButtonTask.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TaskPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void;
    changeStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValuesType;
}

export const Task = (props: TaskPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError(true)
            setNewTaskTitle('')
        } else {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    }
    const onAllCLickHandler = () => props.changeFilter('all')
    const onActiveCLickHandler = () => props.changeFilter('active')
    const onCompletedCLickHandler = () => props.changeFilter('completed')


    return (
        <StyledNotes>
            <TaskContainer>
                <h1>{props.title}</h1>
                <StyledInputContainer>
                    <StyledInput color={error ? "red" : "black"} onKeyDown={onKeyDownHandler} placeholder={'Enter text'}
                                 value={newTaskTitle}
                                 onChange={onNewTitleChangeHandler} type="text"/>
                    <button onClick={addTask}>+</button>
                </StyledInputContainer>
                {error && <StyledErrorText>Field is required</StyledErrorText>}
                {props.tasks.length === 0 ? (
                    <p>There are no notes here yet.</p>
                ) : (
                    <StyledList>
                        {props.tasks.map((t: TaskType, id: number) => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked)
                            }
                            const onClickHandler = () => props.removeTask(t.id)
                            return <TaskTitle>
                                <TaskItem opacity={t.isDone ? 0.5 : 1} key={id}>
                                    <input type={"checkbox"} onChange={onChangeHandler} checked={t.isDone}/>{t.title}
                                </TaskItem>
                                <TaskTitleButton
                                    onClick={onClickHandler}>x
                                </TaskTitleButton>
                            </TaskTitle>
                        })}
                    </StyledList>)}
                <StyledTaskFooter>
                    <ButtonTask backgroundColor={props.filter === 'all' ? "rgba(16, 73, 179, 0.63)" : "white"}
                                onClick={onAllCLickHandler}>All</ButtonTask>
                    <ButtonTask backgroundColor={props.filter === 'active' ? "rgba(16, 73, 179, 0.63)" : "white"}
                                onClick={onActiveCLickHandler}>Active</ButtonTask>
                    <ButtonTask backgroundColor={props.filter === 'completed' ? "rgba(16, 73, 179, 0.63)" : "white"}
                                onClick={onCompletedCLickHandler}>Completed</ButtonTask>
                </StyledTaskFooter>
            </TaskContainer>
        </StyledNotes>
    );
};

