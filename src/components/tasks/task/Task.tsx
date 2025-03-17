import {FilterValuesType} from "../Tasks.tsx";
import {
    StyledList,
    StyledNotes,
    StyledTaskFooter,
    StyledTitleContainer, StyledTitleEditableSpan,
    TaskContainer,
    TaskItem,
    TaskTitle,
    TaskTitleButton,
} from "./TaskStyles.tsx";
import {ButtonTask} from "../../ButtonTask.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "../../AddItemForm.tsx";
import {EditableSpan} from "../../EditableSpan.tsx";
type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type TaskPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeToDoListTitle: (id: string, title: string) => void;
}
export const Task = (props: TaskPropsType) => {

    const onAllCLickHandler = () => props.changeFilter('all', props.id)
    const onActiveCLickHandler = () => props.changeFilter('active', props.id)
    const onCompletedCLickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => props.removeTodolist(props.id);
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeToDoListTitle = (title: string) => props.changeToDoListTitle(title, props.id);

    return (
        <StyledNotes>
            <TaskContainer>
                <StyledTitleContainer>
                    <StyledTitleEditableSpan onChange={changeToDoListTitle}  title={props.title}/>
                    <button onClick={removeTodolist}>X</button>
                </StyledTitleContainer>
                <AddItemForm addItem={addTask}/>
                {props.tasks.length === 0 ? (
                    <p>There are no notes here yet.</p>
                ) : (
                    <StyledList>
                        {props.tasks.map((t: TaskType, id: number) => {
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler = (value: string) => {
                                props.changeTaskTitle(t.id, value, props.id)
                            }
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            return <TaskTitle>
                                <TaskItem opacity={t.isDone ? 0.5 : 1} key={id}>
                                    <input type={"checkbox"} onChange={onChangeStatusHandler} checked={t.isDone}/>
                                    <EditableSpan onChange={onChangeTitleHandler} title={t.title}/>
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

