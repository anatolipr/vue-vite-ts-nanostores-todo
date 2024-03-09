import {TodoItem, TodoList, TodoMain} from './todoTypes.js'

import { DeepMapStore, deepMap } from 'nanostores'
import { v4 as uuidv4 } from 'uuid';
import { getCurrentEpoch } from '../util.js';


export const $todo: DeepMapStore<TodoMain> = deepMap<TodoMain>({
    todoLists: []
})

export function addTodoList(name: string): void {

    const newTodoList: TodoList = {
        _id: uuidv4(),
        _rev: 'a',
        createdTime: getCurrentEpoch(),
        name,
        todoItems: []
    }
    
    $todo.setKey('todoLists', 
        [...$todo.get().todoLists, newTodoList]);

}

export function removeTodoList(listIndex: number) {
    
    const todoLists = $todo.get().todoLists;
    todoLists.splice(listIndex, 1);
    $todo.setKey("todoLists", [...todoLists])

}


/**
 * add todo to a todo list
 * @param value - string of the new todo
 * @param listIndex - index of the TODO list
 */
export function addTodo(value: string, listIndex: number): void {

    const newTodoItem: TodoItem = {
        createdTime: getCurrentEpoch(),
        completed: false,
        completedTime: undefined,
        value
    }

    $todo.setKey(`todoLists[${listIndex}].todoItems`, 
    [...$todo.get().todoLists[listIndex].todoItems, newTodoItem])
}

/**
 * remove an item from todo items
 * @param listIndex - index of the TODO list
 * @param todoItemIndex - index of the todo item to remove
 */
export function removeTodoItem(listIndex: number, todoItemIndex: number): void {

    const todoItems: TodoItem[] = $todo.get().todoLists[listIndex].todoItems;
    todoItems.splice(todoItemIndex, 1);
    $todo.setKey(`todoLists[${listIndex}].todoItems`, [...todoItems]);

}

