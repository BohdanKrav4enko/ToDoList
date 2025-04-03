import {useSelector} from 'react-redux'
import {RootState} from "../../model/store.ts";

export const useAppSelector = useSelector.withTypes<RootState>()