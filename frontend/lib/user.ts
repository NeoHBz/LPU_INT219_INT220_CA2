import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getVisitorId } from "../utils/visitorId";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
        async prepareHeaders(headers: Headers) {
            try {
                const token = localStorage.getItem("token");


                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            } catch (error: any) {
                console.error("Error getting token", error);
            }
        },
    }),
    tagTypes: ["refresh", "userInfo", "classes"],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (Credentials) => ({
                url: "/auth/signUp",
                method: "POST",
                body: { ...Credentials },
            }),
        }),
        logIn: builder.mutation({
            query: (Credentials) => ({
                url: "/user/login",
                method: "POST",
                body: { ...Credentials },
            }),
        }),
        whoAmi: builder.query({
            query: () => ({
                url: "/user/me",
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
        allClasses: builder.query({
            query: () => ({
                url: "/classes",
                method: "GET",
            }),
            providesTags: ["classes"],
        }),
        allMembers: builder.query({
            query: () => ({
                url: "/members",
                method: "GET",
            }),
            providesTags: ["classes"],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        allTrainers: builder.query({
            query: () => ({
                url: "/trainers",
                method: "GET",
            }),
            providesTags: ["classes"]
        }),
        allEquipments: builder.query({
            query: () => ({
                url: "/equipment",
                method: "GET",
            }),
            providesTags: ["classes"],
            transformResponse: (response: any) => {
                return response.data;
            }   
        }),
        maintainanceEquipments: builder.query({
            query: () => ({
                url: "/maintainanceEquipments",
                method: "GET",
            }),
            providesTags: ["classes"]
        }),
        membershipPlans: builder.query({
            query: () => ({
                url: "/plans",
                method: "GET",
            }),
            providesTags: ["classes"],
            transformResponse: (response: any) => {
                return response.data;
            }
        }),
        membershipSubscribers: builder.query({
            query: () => ({
                url: "/membershipSubscribers",
                method: "GET",
            }),
            providesTags: ["classes"]
        }),
        dashboard: builder.query({
            query: () => ({
                url: "/dashboard",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useSignUpMutation,
    useWhoAmiQuery,
    useLazyAllClassesQuery,
    useLazyWhoAmiQuery,
    useAllMembersQuery, 
    useAllTrainersQuery,
    useAllEquipmentsQuery, 
    useMaintainanceEquipmentsQuery, 
    useMembershipPlansQuery, 
    useMembershipSubscribersQuery,
    useLogInMutation,
    useDashboardQuery
} = userApi;
