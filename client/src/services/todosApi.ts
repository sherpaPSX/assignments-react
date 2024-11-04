import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoItemsResponse, TodoItemT } from "../models/todo";

const sortTodos = (todos: TodoItemsResponse) => {
    return todos
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
};

export const todosApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query<TodoItemsResponse, void>({
            query: () => ({ url: "/items" }),
            providesTags: ["Todos"],
            transformResponse: (response: TodoItemsResponse) => {
                return sortTodos(response);
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
            async onQueryStarted({ label }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
                        draft.push({
                            id: new Date().getTime().toString(),
                            createdAt: new Date().getDate(),
                            isDone: false,
                            label,
                        });
                        sortTodos(draft);
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        updateTodo: builder.mutation<TodoItemT, UpdateTodoArgs>({
            query: ({ id, label }) => ({
                url: `/items/${id}`,
                method: "PATCH",
                body: {
                    label,
                },
            }),
            onQueryStarted({ id, label }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
                        const updatedIndex = draft.findIndex((item) => item.id === id);
                        if (updatedIndex !== -1) draft[updatedIndex].label = label;
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),

        finishTodo: builder.mutation<void, FinishTodoArgs>({
            query: ({ id, isDone }) => ({
                url: `/items/${id}/complete`,
                method: "PATCH",
                body: {
                    isDone,
                },
            }),
            onQueryStarted({ id, isDone }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
                        const updatedIndex = draft.findIndex((item) => item.id === id);
                        if (updatedIndex !== -1) draft[updatedIndex].isDone = isDone;
                        sortTodos(draft);
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),

        deleteTodo: builder.mutation<void, DeleteTodoArgs>({
            query: ({ id }) => ({
                url: `/items/${id}`,
                method: "DELETE",
            }),
            onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
                        const index = draft.findIndex((todo) => todo.id === id);
                        if (index !== -1) draft.splice(index, 1);
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
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
