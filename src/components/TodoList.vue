<script lang="ts" setup>

    import { DeepReadonly } from 'vue';
    import { addTodo, removeTodoItem, clearTodoItems,
    setTodoListNewValue, removeTodoList, setTodoItemCompleted,
    updateTodoItemName, updateTodoListName } from '../todo/todoStore';

    import { TodoList } from '../todo/todoTypes';

    const props = defineProps<{
        idx: number,
        todo: DeepReadonly<TodoList>
    }>()
</script>

<template
    ><div
        style="position: relative; width: 354px; height: 537px"
        class="list-tile">
        <div class="list-heading">
            <div
                class="heading-text"
                @click="() => updateTodoListName(props.idx)">
                {{ todo.name }}
            </div>
            <div
                style="width: 34px; height: 34px"
                class="trash-icon"
                @click="removeTodoList(idx)"></div>
        </div>
        <div class="list-stats">
            <div>{{ todo.stats.percent }}</div>
            <div class="todo-stats-main-text">
                {{ todo.stats.unfinishedText }}
            </div>
            <div
                style="width: 46px; height: 25px"
                class="clear-btn"
                @click="clearTodoItems(idx)"
                v-if="todo.todoItems.length">
                Clear
            </div>
        </div>
        <div style="overflow: scroll" class="todo-items-container">
            <div class="todo-line" v-for="(td, tdidx) in todo.todoItems">
                <input
                    style="width: 33px; height: 34px"
                    type="checkbox"
                    @input="(e) => setTodoItemCompleted(idx, tdidx, (<HTMLInputElement>e.target).checked)"
                    :checked="td.completed" />
                <div style="flex: 1" @click="updateTodoItemName(idx, tdidx)">
                    {{ td.value }}
                </div>
                <div
                    style="width: 20px; height: 20px"
                    class="trash-icon"
                    @click="removeTodoItem(idx, tdidx)"></div>
            </div>
        </div>
        <div class="list-footer">
            <input
                style="height: 47px; flex: 1"
                class="text-input"
                type="text"
                @keydown.enter="addTodo(idx)"
                @input="(e) => setTodoListNewValue(idx, (<HTMLInputElement>e.target).value)"
                :value="todo.newValue" />
            <button
                style="width: 105px; height: 47px"
                class="std-button"
                type="button"
                @click="addTodo(idx)">
                Add
            </button>
        </div>
    </div></template
>

<style>
    .text-input {
      border-radius: 18px;
      border: 1px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black!important;
    }

    .trash-icon {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 21 21'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' d='M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2m-7 2h14m-9 3v8m4-8v8'/%3E%3C/svg%3E")
    }

    .todo-line {
      gap: 5px;
      display: flex;
      align-items: center;
      justify-content: center
    }

    .list-heading {
      display: flex;
      align-items: center;
      justify-content: center
    }

    .list-stats {
      display: flex;
      align-items: center;
      justify-content: center
    }

    .list-footer {
      gap: 10px;
      display: flex
    }

    .std-button {
      border: 1px solid white;
      border-radius: 18px;
      background-color: #000000;
      display: flex;
      align-items: center;
      justify-content: center
    }

    .list-tile {
      gap: 20px;
      padding: 12px;
      border: 1px solid gray;
      border-radius: 5px;
      background-color: #010101;
      display: flex;
      flex-direction: column
    }

    .todo-items-container {
      padding: 4px;
      border: 1px solid gray;
      border-radius: 5px;
      flex: 1
    }

    .heading-text {
      font-size: 31px;
      flex: 1
    }

    .clear-btn {
      border: 1px solid gray;
      border-radius: 5px;
      background-color: #580000;
      display: flex;
      align-items: center;
      justify-content: center
    }

    .todo-stats-main-text {
      font-size: 16px;
      text-align: center;
      flex: 1
    }

    * {box-sizing: border-box}
</style>
