import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./services/todosApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
