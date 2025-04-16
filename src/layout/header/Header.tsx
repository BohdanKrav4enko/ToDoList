import styled from "styled-components";
import {useAppSelector} from "@/components/tasks/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/store/app-selectors.ts";
import {MaterialUISwitch} from "@/components/MaterialUISwitch.tsx";

type HeaderProps = {
    changeMode: () => void
}

export const Header = (props: HeaderProps) => {
    const themeMode = useAppSelector(selectThemeMode)
    return (
        <StyledHeader themeMode={themeMode}>
            <h1>To Do List</h1>
            <StyledAuthLink>
                <a href={'#'}>Login</a>
                <a href={'#'}>Sign up</a>
                <MaterialUISwitch color={'default'} onChange={props.changeMode} />
            </StyledAuthLink>
        </StyledHeader>
    );
};

const StyledHeader = styled.header<{ themeMode: 'light' | 'dark' }>`
    display: flex;
    justify-content: space-around;
    position: fixed;
    width: 100%;
    height: 70px;
    background-color: ${props =>  props.themeMode === 'dark' ? '#333333' : 'rgba(0, 0, 189, 0.63)'};
    top: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
    h1{
        margin-top: 20px;
        font-family: "Playwrite IN", serif;
        font-size: 24px;
        margin-left: 100px;
        font-weight: 400;
        color: white;
        cursor: default;
        @media screen and (max-width: 550px) {
            margin-right: 20px;
            margin-left: 0;
        }
    }
    
    @media screen and (max-width: 550px) {
        justify-content: flex-end;
        font-size: 20px;
    }
`
const StyledAuthLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    max-width: 220px;
    width: 100%;
    @media screen and (max-width: 400px) {
        max-width: 150px;
    }

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
            transform: scale(1.1);
        }
        @media screen and (max-width: 400px) {
            font-size: 18px;
            margin: 0 6px;
        }
    }
`