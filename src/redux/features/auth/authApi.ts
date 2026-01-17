import { baseApi } from '../../base/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (data) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        registerUser: build.mutation({
            query: (data) => {
                return {
                    url: '/users/create-user',
                    method: 'POST',
                    body: data,
                };
            },
        }),

    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
} = authApi;