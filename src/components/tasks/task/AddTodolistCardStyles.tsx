import styled from "styled-components";

type StyledTodolistCardContainer ={
    wrap: 'wrap' | 'nowrap'
}

export const StyledTodolistCardContainer = styled.div<StyledTodolistCardContainer>`
    display: flex;
    flex-wrap: ${(props) => props.wrap};
    width: 100%;
    gap: 1vh;
`
export const StyledTextGreeting = styled.p`
    cursor: default;
    text-align: center;
    font-size: 70px;
    margin-top: 140px;
    margin-left: 10%;
`
export const StyledTextGreetingList = styled.p`
    cursor: default;
    text-align: center;
    font-size: 30px;
    margin-top: 140px;
`