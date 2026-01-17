import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

export const baseApi = createApi({
      reducerPath: 'baseApi',
      baseQuery: fetchBaseQuery({
            baseUrl: 'https://comments-system-server.onrender.com/api/v1',

            credentials: 'include',
            prepareHeaders: (header, { getState }) => {
                  const { token } = (getState() as RootState).auth;
                  if (token) {
                        header.set('Authorization', `Bearer ${token}`);
                  }
            },
      }),
      endpoints: () => ({}),
      tagTypes: ['Comments'],
});
