
export type TodoMain = {
    todoLists: TodoList[]
}

export type TodoList = {
    _id:         string;
    _rev:        string;
    name:        string;
    createdTime: number;
    todoItems:   TodoItem[];
}

export type TodoItem = {
    createdTime:   number;
    completedTime: number | undefined;
    completed:     boolean;
    value:         string;
}
