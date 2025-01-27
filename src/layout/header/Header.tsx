import styled from "styled-components";

export const Header = () => {
    return (
        <StyledHeader>
            <h1>To Do List</h1>
            <StyledAuthLink>
                <a href={'#'}>Вход</a>
                <a href={'#'}>Регистрация</a>
            </StyledAuthLink>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-around;
    position: fixed;
    width: 100%;
    background-color: rgba(0, 0, 189, 0.63);
    top: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    h1{
        font-family: "Playwrite IN", serif;
        font-size: 24px;
        font-weight: 400;
        color: white;
    }
`
const StyledAuthLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 190px;
    width: 100%;

    a {
        margin: 0 10px;
        color: white;
        text-decoration: none;
        font-size: 20px;
        transition: 0.3s;

        &:hover {
            cursor: pointer;
            color: rgb(148, 189, 223);
            transform: translateY(-5px);
        }

        &:active {
            font-size: 22px;
        }
    }
`