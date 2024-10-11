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
            transformResponse: (response: TodoItemsResponse) => {
                return response
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .sort((a, b) => {
                        if (a.isDone && !b.isDone) {
                            return 1;
                        } else if (!a.isDone && b.isDone) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
            },
        }),
        addTodo: builder.mutation<TodoItemT, AddTodoArgs>({
            query: (body) => ({
                url: "/items",
                method: "POST",
                body: {
                    ...body,
                },
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodo: builder.mutation<TodoItemT, UpdateTodoArgs>({
            query: ({ id, label }) => ({
                url: `/items/${id}`,
                method: "PATCH",
                body: {
                    label,
                },
            }),
            invalidatesTags: ["Todos"],
        }),

        finishTodo: builder.mutation<void, FinishTodoArgs>({
            query: ({ id, isDone }) => ({
                url: `/items/${id}/complete`,
                method: "PATCH",
                body: {
                    isDone,
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

type AddTodoArgs = Pick<TodoItemT, "label">;
type UpdateTodoArgs = Pick<TodoItemT, "id" | "label">;
type DeleteTodoArgs = Pick<TodoItemT, "id">;
type FinishTodoArgs = Pick<TodoItemT, "id" | "isDone">;

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useFinishTodoMutation,
    useDeleteTodoMutation,
} = todosApi;
