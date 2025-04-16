import {Main} from "./layout/section/main/Main.tsx";
import {Header} from "./layout/header/Header.tsx";
import {Sidebar} from "./layout/sidebar/Sidebar.tsx";
import {useAppSelector} from "./components/tasks/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./store/app-selectors.ts";
import {useAppDispatch} from "./components/tasks/common/hooks/useAppDispatch.ts";
import {changeThemeModeAC} from "./store/app-reducer.ts";
import {getTheme} from "./components/tasks/common/theme/theme.ts";
import {ThemeProvider} from "@mui/material";
import {GlobalStyle} from "./style/GlobalStyle.tsx";


export function App() {
    const dispatch = useAppDispatch();

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return <>
        <ThemeProvider theme={theme}>
            <GlobalStyle themeMode={themeMode}/>
            <Header changeMode={changeMode}/>
            <Sidebar/>
            <Main/>
        </ThemeProvider>
    </>
}
