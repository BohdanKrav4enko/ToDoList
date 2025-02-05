import {FilterValuesType} from "../Tasks.tsx";
import {
    TaskContainer,
    StyledInput,
    StyledList,
    StyledTaskFooter,
    StyledNotes,
    TaskTitle,
    TaskTitleButton,
} from "./TaskStyles.tsx";
import {ButtonTask} from "../../../components/ButtonTask.tsx";
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
}

export const Task = (props: TaskPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    }
    const onAllCLickHandler = () => props.changeFilter('all')
    const onActiveCLickHandler = () => props.changeFilter('active')
    const onCompletedCLickHandler = () => props.changeFilter('completed')

    return (
        <StyledNotes>
            <TaskContainer>
                <h1>{props.title}</h1>
                <StyledInput>
                    <input
                        onKeyDown={onKeyDownHandler}
                        placeholder={'Enter text'}
                        value={newTaskTitle}
                        onChange={onNewTitleChangeHandler} type="text"/>
                    <button onClick={addTask}>+
                    </button>
                </StyledInput>
                {props.tasks.length === 0 ? (
                    <p>There are no notes here yet.</p>
                ) : (
                    <StyledList>
                        {props.tasks.map((t: TaskType, id: number) => {
                            return <TaskTitle>
                                <li key={id}><input type={"checkbox"} checked={t.isDone}/>{t.title}</li>
                                <TaskTitleButton onClick={() => {
                                    props.removeTask(t.id)
                                }}>x
                                </TaskTitleButton>
                            </TaskTitle>
                        })}
                    </StyledList>)}
                <StyledTaskFooter>
                    <ButtonTask onClick={onAllCLickHandler}>All</ButtonTask>
                    <ButtonTask onClick={onActiveCLickHandler}>Active</ButtonTask>
                    <ButtonTask onClick={onCompletedCLickHandler}>Completed</ButtonTask>
                </StyledTaskFooter>
            </TaskContainer>
        </StyledNotes>
    );
};

