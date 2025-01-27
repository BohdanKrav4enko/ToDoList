import styled from "styled-components";
import {FilterValuesType} from "../Tasks.tsx";

type TaskType ={
    id: number;
    title: string;
    isDone: boolean;
}

type TaskPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void;
    changeFilter: (value: FilterValuesType) => void;
}

export const Task = (props: TaskPropsType) => {
    return (
        <StyledNotes>
            <NoteContainer>
                <h1>{props.title}</h1>
                <StyledInput>
                    <input type="text"/>
                    <button>+</button>
                </StyledInput>
                <StyledList>
                    {props.tasks.map((t: TaskType, index: number) => {
                        return <li><input key={index} type={"checkbox"} checked={t.isDone}/>{t.title}<button onClick={() => {props.removeTask(t.id)}}>x</button></li>
                    })}
                </StyledList>
                <StyledNoteFooter>
                    <button onClick={() => {props.changeFilter('all')}}>All</button>
                    <button onClick={() => {props.changeFilter('completed')}}>Active</button>
                    <button onClick={() => {props.changeFilter('active')}}>Completed</button>
                </StyledNoteFooter>
            </NoteContainer>
        </StyledNotes>
    );
};

const StyledNotes = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    padding: 50px;
    max-width: 200px;
    width: 100%;

    li {
        list-style: none
    }
`
const StyledList = styled.ul`

`
const StyledInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
`
const StyledNoteFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
`
const NoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`