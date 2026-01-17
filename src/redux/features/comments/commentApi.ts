import { baseApi } from '../../base/baseApi';
import type { Comment } from '../../../types';

export const commentApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getComments: build.query<
                  {
                        data: {
                              data: Comment[];
                              meta: { total: number; page: number; limit: number; totalPage: number };
                        };
                  },
                  { sort?: string; page?: number; limit?: number }
            >({
                  query: ({ sort = '-createdAt', page = 1, limit = 10 }) => ({
                        url: '/comments',
                        params: { sort, page, limit },
                  }),
                  providesTags: (result) =>
                        result
                              ? [
                                      ...(result.data.data || []).map(({ _id }) => ({
                                            type: 'Comments' as const,
                                            id: _id,
                                      })),
                                      { type: 'Comments', id: 'LIST' },
                                ]
                              : [{ type: 'Comments', id: 'LIST' }],
            }),
            createComment: build.mutation<void, { content: string }>({
                  query: (body) => ({
                        url: '/comments',
                        method: 'POST',
                        body,
                  }),
                  invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
            }),
            replyToComment: build.mutation<void, { id: string; content: string }>({
                  query: ({ id, content }) => ({
                        url: `/comments/${id}/reply`,
                        method: 'POST',
                        body: { content },
                  }),
                  invalidatesTags: (_result, _error, { id }) => [{ type: 'Comments', id }, 'Comments'],
            }),
            likeComment: build.mutation<void, string>({
                  query: (id) => ({
                        url: `/comments/${id}/like`,
                        method: 'PATCH',
                  }),
                  invalidatesTags: (_result, _error, id) => [{ type: 'Comments', id }],
            }),
            dislikeComment: build.mutation<void, string>({
                  query: (id) => ({
                        url: `/comments/${id}/dislike`,
                        method: 'PATCH',
                  }),
                  invalidatesTags: (_result, _error, id) => [{ type: 'Comments', id }],
            }),
            updateComment: build.mutation<void, { id: string; content: string }>({
                  query: ({ id, content }) => ({
                        url: `/comments/${id}`,
                        method: 'PATCH',
                        body: { content },
                  }),
                  invalidatesTags: (_result, _error, { id }) => [{ type: 'Comments', id }],
            }),
            deleteComment: build.mutation<void, string>({
                  query: (id) => ({
                        url: `/comments/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: (_result, _error, id) => [{ type: 'Comments', id }, 'Comments'],
            }),
      }),
});

export const {
      useGetCommentsQuery,
      useCreateCommentMutation,
      useReplyToCommentMutation,
      useLikeCommentMutation,
      useDislikeCommentMutation,
      useUpdateCommentMutation,
      useDeleteCommentMutation,
} = commentApi;
