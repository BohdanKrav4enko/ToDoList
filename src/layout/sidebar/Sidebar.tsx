import styled from "styled-components";
import Photo from '../../assets/user.png'
import {useState} from "react";
import {useAppSelector} from "@/components/tasks/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/store/app-selectors.ts";

type SidebarProps = {
    themeMode: 'light' | 'dark'
    isOpen: boolean
}

export const Sidebar = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (<>
            <StyledBurgerButton themeMode={themeMode} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <span></span>
            </StyledBurgerButton>
            {isOpen && <Overlay onClick={() => setIsOpen(false)}/>}
            <StyledSidebar themeMode={themeMode} isOpen={isOpen}>
                <UserItem>
                    <img src={Photo} alt="User photo"/>
                    <p>Ivan Ivanov</p>
                </UserItem>
                <ContainerRegisterUsers>
                    <StyledSidebarButton themeMode={themeMode}>Login</StyledSidebarButton>
                    <StyledSidebarButton themeMode={themeMode}>Sign up</StyledSidebarButton>
                </ContainerRegisterUsers>
                <ButtonItem>
                    <StyledSidebarButton themeMode={themeMode}>Search</StyledSidebarButton>
                    <StyledSidebarButton themeMode={themeMode}>Calendar</StyledSidebarButton>
                    <StyledSidebarButton themeMode={themeMode}>Today</StyledSidebarButton>
                    <StyledSidebarButton themeMode={themeMode}>Upcoming</StyledSidebarButton>
                    <StyledSidebarButton themeMode={themeMode}>Filters and tags</StyledSidebarButton>
                </ButtonItem>
                <FooterContainer>
                    <span>F.A.Q.</span>
                </FooterContainer>
            </StyledSidebar>
        </>
    );
};

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5); /* Затемнение */
    z-index: 900;
`;

export const UserItem = styled.div`
    margin: 80px 40px 40px;
    display: flex;
    align-items: center;
    gap: 1rem;


    img {
        width: 30px;
        height: 30px;
    }
`
export const StyledSidebar = styled.div<SidebarProps & { themeMode: 'light' | 'dark' }>`
    position: fixed;
    z-index: 1000;
    padding: 16px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    max-width: 260px;
    width: 100%;
    background-color: ${({ themeMode }) => themeMode === 'dark' ? '#1f1f1f' : 'rgb(248, 246, 246)'};
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
`;
export const ButtonItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
export const StyledSidebarButton = styled.button<{ themeMode: 'light' | 'dark' }>`
    background-color: ${({ themeMode }) => themeMode === 'dark' ? '#2c2c2c' : '#f0f0f0'};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 100%;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ themeMode }) => themeMode === 'dark' ? '#ffffff' : 'black'};
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;

    &:active {
        background-color: #0055AA;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2);
        transform: scale(0.95);
        color: white;
    }

    &:hover {
        background-color: #0055AA;
        box-shadow: 0 2px 5px rgba(0, 102, 204, 0.3);
        color: white;
    }
`;

export const StyledBurgerButton = styled.button<SidebarProps>`
    height: 40px;
    width: 40px;
    background-color: inherit;
    border: none;
    cursor: pointer;
    z-index: 10000;
    position: fixed;
    top: 14px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 3px;
        background-color: ${({ isOpen, themeMode }) =>
                isOpen
                        ? themeMode === 'light' ? 'black' : '#ffffff'
                        : '#ffffff'};
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    &::before {
        transform: ${({isOpen}) => (isOpen ? 'rotate(45deg)' : 'translateY(-6px)')};
    }

    &::after {
        transform: ${({isOpen}) => (isOpen ? 'rotate(-45deg)' : 'translateY(6px)')};
    }

    span {
        width: 24px;
        height: 3px;
        background-color: ${({isOpen}) => isOpen? 'black' : '#ffffff'};
        transition: opacity 0.3s ease-in-out;
        opacity: ${({isOpen}) => (isOpen ? 0 : 1)};
    }
`
export const ContainerRegisterUsers = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 80px;
`
export const FooterContainer = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: center;

    span {
        font-size: 24px;
        transition: transform 0.2s ease, color 0.3s ease;

        &:hover {
            cursor: pointer;
            color: #ff0044;
        }

        &:active {
            transform: scale(1.1);
        }
    }
`

