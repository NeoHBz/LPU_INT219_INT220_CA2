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
                console.log("token", `Bearer ${token}`);

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
                url: "/allClasses",
                method: "GET",
            }),
            providesTags: ["classes"]
        }),
        allMembers: builder.query({
            query: () => ({
                url: "/allMembers",
                method: "GET",
            }),
            providesTags: ["classes"]
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
                url: "/allEquipments",
                method: "GET",
            }),
            providesTags: ["classes"]
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
                url: "/membershipPlans",
                method: "GET",
            }),
            providesTags: ["classes"]
        }),
        membershipSubscribers: builder.query({
            query: () => ({
                url: "/membershipSubscribers",
                method: "GET",
            }),
            providesTags: ["classes"]
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
    useLogInMutation
} = userApi;
