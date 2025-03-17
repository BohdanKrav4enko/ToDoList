import {Tasks} from "../../../components/tasks/Tasks.tsx";
import {Container} from "../../../components/Container.tsx";
import styled from "styled-components";

export const Main = () => {

    return (
        <StyledContainer>

            <Tasks/>
        </StyledContainer>
    );
};


const StyledContainer = styled(Container)`
    margin-top: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
`

