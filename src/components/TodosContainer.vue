<script lang="ts" setup>
    import { $todo, addTodoList } from '../todo/todoStore';
    import TodoList from './TodoList.vue';
    import {useStore} from '@nanostores/vue';

    const todo = useStore($todo)
</script>

<template
    ><div
        style="position: relative; width: 654px; overflow: scroll; gap: 20px; padding: 20px; border: 1px solid gray; display: flex; align-items: center; justify-content: flex-start">
        <todo-list
            v-for="(todoList, idx) in todo.todoLists"
            :todo="todoList"
            :idx="idx" 
            :key="todoList.key"
            />
        <div
            style="width: 69px; height: 68px; border-radius: 40px; border: 3px solid; content: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2'/%3E%3C/svg%3E&quot;); cursor: pointer"
            @click="() => addTodoList()"></div></div
></template>

<style>

    * {box-sizing: border-box}
</style>
