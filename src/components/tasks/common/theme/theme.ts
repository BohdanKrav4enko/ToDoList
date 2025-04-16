import {createTheme} from '@mui/material/styles'
import {ThemeMode} from "../../../../store/app-reducer.ts";

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            background: {
                default: themeMode === 'light' ? '#ffffff' : '#121212',
                paper: themeMode === 'light' ? '#ffffff' : '#1e1e1e',
            },
            primary: {
                main: themeMode === 'light' ? '#1976d2' : '#90caf9',
            },
        },
    })
}