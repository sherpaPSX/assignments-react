export type TodoItemT = {
    label: string;
    isDone: boolean;
    createdAt: string;
    id: string;
};

export type TodoItemsResponse = TodoItemT[];
