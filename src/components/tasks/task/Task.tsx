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
import {Button} from "../../../components/Button.tsx";

type TaskType = {
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
            <TaskContainer>
                <h1>{props.title}</h1>
                <StyledInput>
                    <input type="text"/>
                    <button>+</button>
                </StyledInput>
                {props.tasks.length === 0 ? (
                    <p>There are no notes here yet.</p>
                ) : (
                <StyledList>
                    {props.tasks.map((t: TaskType, id: number) => {
                        return <TaskTitle>
                            <li><input key={id} type={"checkbox"} checked={t.isDone}/>{t.title}</li>
                            <TaskTitleButton onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </TaskTitleButton>
                        </TaskTitle>
                    })}
                </StyledList>)}
                <StyledTaskFooter>
                    <Button onClick={() => {
                        props.changeFilter('all')
                    }}>All
                    </Button>
                    <Button onClick={() => {
                        props.changeFilter('completed')
                    }}>Active
                    </Button>
                    <Button onClick={() => {
                        props.changeFilter('active')
                    }}>Completed
                    </Button>
                </StyledTaskFooter>
            </TaskContainer>
        </StyledNotes>
    );
};

