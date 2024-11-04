export type TodoItemT = {
    label: string;
    isDone: boolean;
    createdAt: number;
    id: string;
};

export type TodoItemsResponse = TodoItemT[];
