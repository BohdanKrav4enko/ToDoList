import {ChangeEvent, KeyboardEvent, useState} from "react";
import {StyledErrorText, StyledInput, StyledInputContainer} from "./tasks/task/TaskStyles.tsx";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError(true)
            setNewTaskTitle('')
        } else {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    }

    return <>
        <StyledInputContainer>
            <StyledInput color={error ? "red" : "black"} onKeyDown={onKeyDownHandler} placeholder={'Enter text'}
                         value={newTaskTitle}
                         onChange={onNewTitleChangeHandler} type="text"/>
            <button onClick={addTask}>+</button>
        </StyledInputContainer>
        {error && <StyledErrorText>Field is required</StyledErrorText>}
    </>
}