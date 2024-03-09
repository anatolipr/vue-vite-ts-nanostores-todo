
import { test, expect } from 'vitest'

import { $todo, addTodo, addTodoList, removeTodoItem, removeTodoList } from './todo/todoStore.js'
import { TodoMain } from './todo/todoTypes.js';

test('addTodoList', () => {

    $todo.setKey('todoLists', [])

    addTodoList('xxx');
    addTodoList('yyy');

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists.length).toBe(2);
    expect(todos.todoLists[1].name).toBe('yyy')
    
})

test('removeTodoList', () => {

    $todo.setKey('todoLists', [])

    addTodoList('xxx');
    addTodoList('yyy');
    
    removeTodoList(0);

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists.length).toBe(1);
    expect(todos.todoLists[0].name).toBe('yyy')
    
})


test('addTodoItem', () => {
    $todo.setKey('todoLists', [])

    addTodoList('yyy');

    addTodo('uuu', 0);
    addTodo('aaa', 0);

    const todos: TodoMain  = $todo.get();
    
    expect(todos.todoLists[0].todoItems.length).toBe(2)
    expect(todos.todoLists[0].todoItems[0].value).toBe('uuu')

})

test('removeTodoItem', () => {
    $todo.setKey('todoLists', [])

    addTodoList('yyy');

    addTodo('uuu', 0);
    addTodo('aaa', 0);

    removeTodoItem(0, 0);
    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists[0].todoItems[0].value).toBe('aaa')
})




