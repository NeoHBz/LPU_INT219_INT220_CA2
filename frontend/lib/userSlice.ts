import { createSelector, createSlice } from "@reduxjs/toolkit";
interface StateInterface {
    userInfo: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isAdmin: boolean;
        phone_number: string;
        profilePicture?: string;
        address: string;
        city?: string;
        state?: string;
        zipCode?: string;
        fitnessGoals?: string;
        healthConditions?: string;
        emergencyContact?: string;
        emergencyPhone?: string;

    }
}
const initialState: StateInterface = {
    userInfo: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: false,
        phone_number: "",
        profilePicture: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        fitnessGoals: "",
        healthConditions: "",
        emergencyContact: "",
        emergencyPhone: ""
    },

};
const fitnessCenterData = createSlice({
    name: "userInformation",
    initialState,
    reducers: {
        setUserInformation: (
            state: StateInterface,
            action: {
                payload: any;
            },
        ) => {
            state.userInfo = action.payload;
        },

    },
});

export const { setUserInformation } = fitnessCenterData.actions;
export default fitnessCenterData.reducer;

export const selectUserInformation = (state: { userInformation: StateInterface }) => state.userInformation.userInfo;
export const selectIsUserAdmin = createSelector(
    selectUserInformation,
    (userInfo) => userInfo.isAdmin

)
export const selectOnlyLogin = createSelector(
    selectUserInformation,

    (userInfo) => userInfo.email !== ""
)