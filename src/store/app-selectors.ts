import { RootState } from "./store.ts"

export const selectThemeMode = (state: RootState) => state.appTheme.themeMode
