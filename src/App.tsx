import {Main} from "./layout/section/main/Main.tsx";
import {Header} from "./layout/header/Header.tsx";
import {Sidebar} from "./layout/sidebar/Sidebar.tsx";

export function App() {
    return (
        <>
            <Header/>
            <Sidebar/>
            <Main/>
        </>
    )
}



