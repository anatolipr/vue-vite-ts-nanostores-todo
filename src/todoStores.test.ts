
import { test, expect } from 'vitest'

import { $todo, addTodo, addTodoList, removeTodoItem, removeTodoList, setTodoItemChecked, setTodoItemCompleted, setTodoItemValue, setTodoListName } from './todo/todoStore.js'
import { TodoMain } from './todo/todoTypes.js';


// ***** Lists *****

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

test('setTodoListName', () => {
    $todo.setKey('todoLists', [])
    addTodoList('xxx');

    setTodoListName(0, 'hello')

    const todos: TodoMain  = $todo.get();
    expect(todos.todoLists[0].name).toBe('hello')
})

// ***** Lists -> TODOs *****

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


test('setTodoItemValue', () => {
    $todo.setKey('todoLists', [])

    addTodoList('yyy');
    addTodo('uuu', 0);

    setTodoItemValue(0, 0, 'foo')

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists[0].todoItems[0].value).toBe('foo')
})

test('setTodoItemCompleted', () => {
    $todo.setKey('todoLists', [])

    addTodoList('yyy');
    addTodo('uuu', 0);

    setTodoItemCompleted(0, 0, true)

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists[0].todoItems[0].completed).toBe(true)
})


