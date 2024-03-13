import {TodoItem, TodoList, TodoMain, TodoStats} from './todoTypes.js'

import { atom, WritableAtom } from 'nanostores'
import { v4 as uuidv4 } from 'uuid';
import { getCurrentEpoch } from '../util.js';

import { nextTick } from "vue";
import { doPrompt } from '../components/prompt/prompt.js';


export const $todo: WritableAtom<TodoMain> = atom<TodoMain>({
    todoLists: JSON.parse(localStorage?.getItem('todoLists')||'[]')
})

$todo.listen((todo: Readonly<TodoMain>) => {
    localStorage?.setItem('todoLists', JSON.stringify(todo.todoLists))
})

//***** Lists ******

export async function addTodoList(name: string = "Unnamed", shouldPrompt: boolean = false): Promise<void> {

    if (shouldPrompt) {
        const input = await doPrompt('List name', name);
        if (input === undefined) {
            return;
        }
        name = input;
    }
    const newTodoList: TodoList = {
        _id: uuidv4(),
        _rev: 'a',
        createdTime: getCurrentEpoch(),
        name,
        todoItems: [],
        newValue:'',
        stats: getTodoStats([]),
        key:0
    }

    const todoLists = $todo.get().todoLists;
    todoLists.push(newTodoList)
    $todo.set({todoLists});

    console.log(todoLists)

}

export function setTodoListNewValue(listIndex: number, newValue: string): void {
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].newValue = newValue;
    $todo.set({todoLists});
}

export function removeTodoList(listIndex: number) {
    if (!confirm('are you sure?')) {
        return
    }
    const todoLists = $todo.get().todoLists;
    todoLists.splice(listIndex, 1);
    $todo.set({todoLists});

}


export function setTodoListName(listIndex: number, name: string): void {
   
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].name = name;
    todoLists[listIndex].key = Math.random()
    $todo.set({todoLists});

}


//***** Lists -> TODOs ******

/**
 * add todo to a todo list
 * @param value - string of the new todo
 * @param listIndex - index of the TODO list
 */
export async function addTodo(listIndex: number): Promise<void> {

    const todoLists = $todo.get().todoLists;

    const newTodoItem: TodoItem = {
        createdTime: getCurrentEpoch(),
        completed: false,
        completedTime: undefined,
        value: todoLists[listIndex].newValue || 'specify...'
    }
    
    todoLists[listIndex].todoItems.push(newTodoItem);
    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].newValue = ''
    
    todoLists[listIndex].key = Math.random()
    $todo.set({todoLists});

    const objDiv = document.getElementById('todoitems' + listIndex)
    if (objDiv) {
        await nextTick();
        objDiv.scrollTop = objDiv.scrollHeight;
    } 

    document.getElementById('todoinput' + listIndex)?.focus()
}

/**
 * remove an item from todo items
 * @param listIndex - index of the TODO list
 * @param todoItemIndex - index of the todo item to remove
 */
export function removeTodoItem(listIndex: number, todoItemIndex: number): void {

    if (!confirm('are you sure?')) {
        return
    }

    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems.splice(todoItemIndex, 1);
    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].key = Math.random()
    $todo.set({todoLists});
    
}

export function setTodoItemValue(listIndex: number, todoItemIndex: number, value: string) {
    
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems[todoItemIndex].value = value;
    todoLists[listIndex].key = Math.random()
    $todo.set({todoLists});
    
}

export function setTodoItemCompleted(listIndex: number, todoItemIndex: number, completed: boolean) {

    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems[todoItemIndex].completed = completed;
    todoLists[listIndex].todoItems[todoItemIndex].completedTime = 
        completed ? getCurrentEpoch() : undefined;

    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].key = Math.random()
    $todo.set({todoLists});

}

export function clearTodoItems(listIndex: number): void {
    if (!confirm('are you sure?')) {
        return
    }
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems = [];
    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].newValue = ''
    todoLists[listIndex].key = Math.random()
    $todo.set({todoLists});

}

export const NOTHING_TODO_LABEL = 'Nothing to do';
export const ALL_DONE_LABEL = 'All done!';

/**
 * get todo stats based on completed vs total count
 * @param todos 
 * @returns stats for this list
 */
export function getTodoStats(todos: TodoItem[]): TodoStats {

    let totalTodos: number = todos.length;
    let completedTodos: number = getNumberOfCompletedTodos(todos);

    let percent: string = '';

    let unfinishedText = '';
    if (totalTodos === 0) {
        unfinishedText = NOTHING_TODO_LABEL;
    } else {
        if (totalTodos === completedTodos) {
            unfinishedText = ALL_DONE_LABEL
        } else {
            unfinishedText = `${completedTodos} of ${totalTodos} finished`
        }

        percent = Math.floor( ( completedTodos / totalTodos ) * 100 ) + '%'
    } 
    

    return  {
        percent,
        unfinishedText
    }

}

export function getNumberOfCompletedTodos(todos: TodoItem[]): number {
    return todos.filter(todo => todo.completed).length;
}


//User input

export async function updateTodoListName(listIndex: number): Promise<void> {
    const todoLists = $todo.get().todoLists;
    
    const value: string | undefined = 
        await doPrompt('New list name', todoLists[listIndex].name);
        
        
    if (value !== undefined) {
        todoLists[listIndex].name = value;
        todoLists[listIndex].key = Math.random()
        $todo.set({todoLists});
    }

}

export async function updateTodoItemName(listIndex: number, todoItemIndex: number): Promise<void> {

    const todoLists = $todo.get().todoLists;
    
    const value: string | undefined = 
        await doPrompt('TODO value', todoLists[listIndex].todoItems[todoItemIndex].value);

    if (value !== undefined) {
        todoLists[listIndex].todoItems[todoItemIndex].value = value;
        todoLists[listIndex].key = Math.random()
        $todo.set({todoLists});
    }

}

