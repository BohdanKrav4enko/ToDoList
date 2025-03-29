import {FilterValuesType} from "../Tasks.tsx";
import {
    StyledList, StyledNoNotesText,
    StyledNotes,
    StyledTaskFooter, StyledTaskIconButton,
    StyledTitleContainer, StyledTitleEditableNotesSpan, StyledTitleEditableSpan, StyledTitleIconButton,
    TaskContainer,
    TaskItem,
    TaskTitle,
} from "./TaskStyles.tsx";
import {ButtonTask} from "../../ButtonTask.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "../../AddItemForm.tsx";
import {Checkbox, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


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
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void;
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
            <Paper style={{padding: '30px', maxWidth: '376px', width: '100%'}} elevation={3}>
                <TaskContainer>
                    <StyledTitleContainer>
                        <StyledTitleEditableSpan onChange={changeToDoListTitle} title={props.title}/>
                        <StyledTitleIconButton onClick={removeTodolist} aria-label="delete" size="small">
                            <DeleteIcon color={"primary"} fontSize="small"/>
                        </StyledTitleIconButton>
                    </StyledTitleContainer>
                    <AddItemForm addItem={addTask}/>
                    {props.tasks.length === 0 ? (
                        <StyledNoNotesText>There are no notes here yet.</StyledNoNotesText>
                    ) : (
                        <StyledList>
                            {props.tasks.map((t: TaskType, id: number) => {
                                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(t.id, props.id, e.currentTarget.checked)
                                }
                                const onChangeTitleHandler = (value: string) => {
                                    props.changeTaskTitle(t.id, value, props.id)
                                }
                                const onClickHandler = () => props.removeTask(t.id, props.id)
                                return <TaskTitle>
                                    <TaskItem key={id}>
                                        <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                                        <div>
                                            <StyledTitleEditableNotesSpan isDone={t.isDone}
                                                                          onChange={onChangeTitleHandler}
                                                                          title={t.title}/>
                                        </div>
                                    </TaskItem>
                                    <StyledTaskIconButton onClick={onClickHandler} aria-label="delete" size="small">
                                        <DeleteIcon color={"primary"} fontSize="small"/>
                                    </StyledTaskIconButton>
                                </TaskTitle>
                            })}
                        </StyledList>)}
                    <StyledTaskFooter>
                        <ButtonTask value={props.filter === 'all'}
                                    onClick={onAllCLickHandler}>All</ButtonTask>
                        <ButtonTask value={props.filter === 'active'}
                                    onClick={onActiveCLickHandler}>Active</ButtonTask>
                        <ButtonTask value={props.filter === 'completed'}
                                    onClick={onCompletedCLickHandler}>Completed</ButtonTask>
                    </StyledTaskFooter>
                </TaskContainer>
            </Paper>
        </StyledNotes>
    );
};

