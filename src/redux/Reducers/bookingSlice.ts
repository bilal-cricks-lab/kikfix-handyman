import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingRequest, BookingArray } from "../../types/booking";

const bookingInitialState: BookingArray = {
    booking: null
};

export const booking_Slice = createSlice({
    name: 'booking',
    initialState: bookingInitialState,
    reducers: {
        setBookingData: (state, action: PayloadAction<BookingRequest>) => {
            state.booking = action.payload;
        },
        clearData: (state) => {
            state.booking = null
        }
    }
})

export const {setBookingData, clearData} = booking_Slice.actions
export default booking_Slice.reducer;