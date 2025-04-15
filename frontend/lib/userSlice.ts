import { createSelector, createSlice } from "@reduxjs/toolkit";
interface StateInterface {
    userInfo: {
        firstName: string;
        lastName: string;
        email: string;
        isAdmin: boolean;
        phoneNumber: string;
        profilePicture?: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        fitnessGoals: string;
        healthConditions: string;
    }
}
const initialState: StateInterface = {
    userInfo: {
        firstName: "",
        lastName: "",
        email: "asdf",
        isAdmin: false,
        phoneNumber: "",
        profilePicture: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        fitnessGoals: "",
        healthConditions: ""
    },

};
const fitnessCenterData = createSlice({
    name: "userInformation",
    initialState,
    reducers: {
        setUserInformation: (
            state: StateInterface,
            action: {
                payload: Pick<StateInterface, "userInfo">;
            },
        ) => {
            state.userInfo = action.payload.userInfo;
        },

    },
});

export const { setUserInformation } = fitnessCenterData.actions;
export default fitnessCenterData.reducer;

export const selectUserInformation = (state: any) => state.userInformation.userInfo;
export const selectIsUserAdmin = createSelector(
    selectUserInformation,
    (userInfo) => userInfo.isAdmin
)
export const selectOnlyLogin = createSelector(
    selectUserInformation,
    (userInfo) => userInfo.email !== ""
)