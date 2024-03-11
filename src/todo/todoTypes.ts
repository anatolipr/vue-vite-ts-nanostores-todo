
export type TodoMain = {
    todoLists: TodoList[],
    key?: number
}


export type TodoStats = {
    percent: string;
    unfinishedText: string;
};

export type TodoList = {
    _id:         string;
    _rev:        string;
    name:        string;
    createdTime: number;
    todoItems:   TodoItem[];
    newValue:    string;
    stats:       TodoStats;
    key?:        number
}

export type TodoItem = {
    createdTime:   number;
    completedTime?: number;
    completed:     boolean;
    value:         string;
}
