<script lang="ts" setup>
    import { DeepReadonly, Ref } from 'vue';
    import { $todo, addTodoList } from '../todo/todoStore';
    import { TodoMain } from '../todo/todoTypes';
    import TodoList from './TodoList.vue';
    import {useStore} from '@nanostores/vue';

    const todo: DeepReadonly<Ref<TodoMain>>  = useStore($todo)
</script>

<template
    ><div
        style="position: relative; width: 654px; overflow: scroll"
        class="horizontal-container">
        <todo-list
            v-for="(todoList, idx) in todo.todoLists"
            :todo="todoList"
            :idx="idx"
            :key="todoList.key" />
        <div
            style="width: 69px; height: 68px"
            class="big-plus"
            @click="addTodoList('Unnamed', true)"></div></div
></template>

<style>
    .big-plus {
      border-radius: 40px;
      border: 3px solid;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2'/%3E%3C/svg%3E");
      cursor: pointer
    }

    .horizontal-container {
      gap: 20px;
      padding: 20px;
      border: 1px solid gray;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      resize: horizontal;
    }

    * {box-sizing: border-box}
</style>
