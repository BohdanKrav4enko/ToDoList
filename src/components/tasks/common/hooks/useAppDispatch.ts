import {useDispatch} from 'react-redux'
import {AppDispatch} from "../../model/store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()