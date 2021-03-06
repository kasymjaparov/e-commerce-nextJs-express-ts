import { configureStore } from '@reduxjs/toolkit'
import {
    useDispatch,
    useSelector,
    TypedUseSelectorHook
} from 'react-redux';

export const store = configureStore({
    reducer: {

    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;