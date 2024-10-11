import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoItemsResponse, TodoItemT } from "../models/todo";

export const todosApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query<TodoItemsResponse, void>({
            query: () => ({ url: "/items" }),
            providesTags: ["Todos"],
        }),
        postTodo: builder.mutation<TodoItemT, PostTodoArgs>({
            query: (body) => ({
                url: "/items",
                method: "POST",
                body: {
                    ...body,
                },
            }),
        }),
        patchTodo: builder.mutation<TodoItemT, PatchTodoArgs>({
            query: ({ id, ...patch }) => ({
                url: `/items/${id}`,
                method: "PATCH",
                body: {
                    ...patch,
                },
            }),
            invalidatesTags: ["Todos"],
        }),

        deleteTodo: builder.mutation<void, DeleteTodoArgs>({
            query: ({ id }) => ({
                url: `/items/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

type PostTodoArgs = Omit<TodoItemT, "createdAt">;
type PatchTodoArgs = Partial<Pick<TodoItemT, "isDone" | "label">> & {
    id: TodoItemT["id"];
};
type DeleteTodoArgs = Pick<TodoItemT, "id">;

export const { useGetTodosQuery, usePostTodoMutation, usePatchTodoMutation, useDeleteTodoMutation } = todosApi;
