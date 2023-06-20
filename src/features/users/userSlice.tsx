import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface User {
  name: string;
  email: string;
  authToken: string;
  completedSteps: number;
  phoneNumber: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
  geolocation: string;
}
const initialState: User = {
  name: "",
  email: "",
  authToken: "",
  completedSteps: 0,
  phoneNumber: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  pincode: 0,
  country: "",
  geolocation: "",
};

interface BasicDetails {
  name: string;
  email: string;
  phoneNumber: string;
}

interface Address {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuthToken: (state: User, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },

    setCompletedSteps: (state: User, action: PayloadAction<number>) => {
      state.completedSteps = action.payload;
    },
    setUserBasicDetails: (state: User, action: PayloadAction<BasicDetails>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setUserAddressDetails: (state: User, action: PayloadAction<Address>) => {
      state.address_1 = action.payload.address_1;
      state.address_2 = action.payload.address_1;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.pincode = action.payload.pincode;
      state.country = action.payload.country;
    },
  },
});
export const {
  setUserBasicDetails,
  setUserAddressDetails,
  setCompletedSteps,
  setAuthToken,
} = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
