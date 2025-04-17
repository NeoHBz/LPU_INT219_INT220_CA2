import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./user";
import { setupListeners } from "@reduxjs/toolkit/query";
import fitnessCenterReducer from "./userSlice";



const storePoulator = (store: any) => (next: any) => (action: any) => {
    if (action?.payload?.userInfo && action.type !== "userInformation/setUserInformation") {
        store.dispatch({
            type: "userInformation/setUserInformation",
            payload: {
                userInfo: action.payload.userInfo,
            },
        });
        console.log("current state", store.getState());
    }

    return next(action);
}


export const Store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        userInformation: fitnessCenterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([userApi.middleware, storePoulator]),
    // getDefaultMiddleware().concat([userApi.middleware, abc]),

    devTools: true,
});
setupListeners(Store.dispatch);
// (getDefaultMiddleware) =>getDefaultMiddleware().concat(userApi.middleware),

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
