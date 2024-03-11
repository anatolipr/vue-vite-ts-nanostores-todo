
import { test, expect } from 'vitest'

import { $todo, ALL_DONE_LABEL, NOTHING_TODO_LABEL, addTodo, addTodoList, clearTodoItems, getNumberOfCompletedTodos, getTodoStats, removeTodoItem, removeTodoList, setTodoItemCompleted, setTodoItemValue, setTodoListName, setTodoListNewValue } from './todo/todoStore.js'
import { TodoMain } from './todo/todoTypes.js';



// ***** Lists *****

test('addTodoList', () => {

    $todo.set({'todoLists': []})

    addTodoList();
    addTodoList('yyy');

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists.length).toBe(2);
    expect(todos.todoLists[1].name).toBe('yyy')

    expect(todos.todoLists[0].stats.percent).toBe('')
    
})

test('removeTodoList', () => {

    $todo.set({'todoLists': []})

    addTodoList();
    addTodoList('yyy');
    
    removeTodoList(0);

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists.length).toBe(1);
    expect(todos.todoLists[0].name).toBe('yyy')
    
})

test('setTodoListName', () => {
    $todo.set({'todoLists': []})
    addTodoList('xxx');

    setTodoListName(0, 'hello')

    const todos: TodoMain  = $todo.get();
    expect(todos.todoLists[0].name).toBe('hello')
})

test('setTodoListNewValue', () => {
    $todo.set({'todoLists': []})
    addTodoList('xxx');

    setTodoListNewValue(0, 'hello')

    const todos: TodoMain  = $todo.get();
    expect(todos.todoLists[0].newValue).toBe('hello')
})

// ***** Lists -> TODOs *****

test('addTodoItem', () => {
    $todo.set({'todoLists': []})

    addTodoList();

    setTodoListNewValue(0, 'uuu')
    addTodo(0);
    setTodoListNewValue(0, 'aaa')
    addTodo(0);

    setTodoItemCompleted(0, 0, true)

    const todos: TodoMain  = $todo.get();
    console.log(todos.todoLists[0].todoItems)
    expect(todos.todoLists[0].todoItems.length).toBe(2)
    expect(todos.todoLists[0].todoItems[0].value).toBe('uuu')

    expect(todos.todoLists[0].stats.percent).toBe('50%')

})

test('removeTodoItem', () => {
    $todo.set({'todoLists': []})

    addTodoList();

    setTodoListNewValue(0, 'uuu')
    addTodo(0);
    setTodoListNewValue(0, 'aaa')
    addTodo(0);

    setTodoItemCompleted(0, 1, true)

    removeTodoItem(0, 0);
    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists[0].todoItems[0].value).toBe('aaa')
    expect(todos.todoLists[0].stats.percent).toBe('100%')
})


test('setTodoItemValue', () => {
    $todo.set({'todoLists': []})

    addTodoList();
    setTodoListNewValue(0, 'uuu')
    addTodo(0);

    setTodoItemValue(0, 0, 'foo')

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists[0].todoItems[0].value).toBe('foo')
})

test('setTodoItemCompleted', () => {
    $todo.set({'todoLists': []})

    addTodoList();
    setTodoListNewValue(0, 'uuu')
    addTodo(0);

    setTodoItemCompleted(0, 0, true)

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists[0].todoItems[0].completed).toBe(true)

    expect(todos.todoLists[0].stats.percent).toBe('100%')
    
})

test('clearTodoItems', () => {
    $todo.set({'todoLists': []})

    addTodoList();
    addTodoList();
    addTodo(1);
    
    clearTodoItems(1);

    const todos: TodoMain  = $todo.get();

    expect(todos.todoLists[1].todoItems.length).toBe(0)

    expect(todos.todoLists[0].stats.percent).toBe('')
})

//Stats

test('test getTodoStats', () => {
    

    let stats = getTodoStats([]);

    expect(stats.unfinishedText).toBe(NOTHING_TODO_LABEL);
    expect(stats.percent).toBe('');

    stats = getTodoStats([
        {
            completed: true,
            createdTime: 1,
            value: 'x'
        }
    ]);

    expect(stats.unfinishedText).toBe(ALL_DONE_LABEL);
    expect(stats.percent).toBe('100%');


    stats = getTodoStats([
        {
            completed: false,
            createdTime: 1,
            value: 'x'
        }
    ]);
    
    expect(stats.unfinishedText).toBe("0 of 1 finished");
    expect(stats.percent).toBe("0%");

    stats = getTodoStats([
        {
            completed: false,
            createdTime: 1,
            value: 'x'
        },
        {
            completed: true,
            createdTime: 1,
            value: 'x'
        }
    ]);

    expect(stats.unfinishedText).toBe("1 of 2 finished");
    expect(stats.percent).toBe("50%");


})

test('getNumberOfCompletedTodos', () => {
    expect(getNumberOfCompletedTodos([
        {
            completed: false,
            createdTime: 1,
            value: 'x'
        }
    ])).toBe(0)
    expect(getNumberOfCompletedTodos([
        {
            completed: true,
            createdTime: 1,
            value: 'x'
        }
    ])).toBe(1)
})
