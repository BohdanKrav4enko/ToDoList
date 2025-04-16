import {ButtonTask} from "@/components/ButtonTask.tsx";
import {StyledTaskFooter} from "@/components/tasks/task/TaskStyles.tsx";
import {useAppSelector} from "@/components/tasks/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/store/app-selectors.ts";
import {useCallback} from "react";
import {useTaskLogic} from "@/components/tasks/common/hooks/useTaskLogic.ts";
import {TaskPropsType} from "@/components/tasks/task/Task.tsx";

export const FilterButtons = (props: TaskPropsType) => {
    const themeMode = useAppSelector(selectThemeMode)

    const {changeFilter} = useTaskLogic(props.id);

    const onAllCLickHandler = useCallback(() => changeFilter('all'), [changeFilter]);
    const onActiveCLickHandler = useCallback(() => changeFilter('active'), [changeFilter]);
    const onCompletedCLickHandler = useCallback(() => changeFilter('completed'), [changeFilter]);

    return (
        <StyledTaskFooter>
            <ButtonTask themeMode={themeMode}
                        value={props.filter === 'all'}
                        onClick={onAllCLickHandler}>All</ButtonTask>
            <ButtonTask themeMode={themeMode}
                        value={props.filter === 'active'}
                        onClick={onActiveCLickHandler}>Active</ButtonTask>
            <ButtonTask themeMode={themeMode}
                        value={props.filter === 'completed'}
                        onClick={onCompletedCLickHandler}>Completed</ButtonTask>
        </StyledTaskFooter>
    );
};

