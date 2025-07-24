import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorProps {
    error: string
}

interface ErrorObject {
    error: ErrorProps | null
}

const errorState: ErrorObject = {
    error: null,
} 

export const error_Slice = createSlice({
    name: 'error',
    initialState: errorState,
    reducers: {
        setError: (state, action: PayloadAction<ErrorProps>) => {
            state.error = action.payload
        }
    }
})

export const {setError} = error_Slice.actions;

export default error_Slice.reducer;