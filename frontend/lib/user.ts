import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getVisitorId } from "../utils/visitorId";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
        // async prepareHeaders(headers: Headers) {
        //     try {
        //         const { visitorId, brand } = (await getVisitorId()) || {
        //             visitorId: undefined,
        //             brand: null,
        //         };
        //         if (visitorId && brand) {
        //             headers.set("visitorId", visitorId);
        //             headers.set("brand", brand);
        //         }
        //         let accessToken = await AsyncStorage.getItem("accessToken");
        //         let refreshToken = await AsyncStorage.getItem("refreshToken");
        //         if (refreshToken) {
        //             headers.set("refreshToken", refreshToken);
        //         }
        //         if (accessToken) {
        //             headers.set("accessToken", accessToken);
        //         }
        //     } catch (error: any) {}
        // },
    }),
    tagTypes: ["refresh", "userInfo"],
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (Credentials) => ({
                url: "/auth/signUp",
                method: "POST",
                body: { ...Credentials },
            }),
        }),
        whoAmi: builder.query({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
            providesTags: ["refresh", "userInfo"],
        }),
        profile: builder.query({
            query: (location: string) => ({
                url: `/fetchSafetyData/${location}`,
                method: "GET",
            }),
        }),



        // getTransaction: builder.query({
        //     query: (groupId) => ({
        //         url: `/getTransaction/${groupId}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["globalTypes", "refresh"],
        // }),
    }),
});

export const {
    useSignupMutation,
    useWhoAmiQuery
} = userApi;
