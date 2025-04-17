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
    tagTypes: ["refresh", "userInfo", "classes"],
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
                url: "/allTrainers",
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
    useSignupMutation,
    useWhoAmiQuery,
    useLazyAllClassesQuery,
    useLazyWhoAmiQuery,
    useAllMembersQuery, 
    useAllTrainersQuery,
    useAllEquipmentsQuery, 
    useMaintainanceEquipmentsQuery, 
    useMembershipPlansQuery, 
    useMembershipSubscribersQuery
} = userApi;
