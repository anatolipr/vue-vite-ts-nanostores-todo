<script lang="ts" setup>

//import { computed } from 'nanostores';
import { $todo, setTodoItemValue } from '../todo/todoStore';
import { useStore } from '@nanostores/vue';



    const props = defineProps<{
        idx: number
    }>()

   // computed($todo, todo => todo.todoLists[props.idx].todoItems)

    const todo = useStore($todo)
    
</script>

<template
    ><div
        style="position: relative; width: 354px; height: 537px; gap: 20px; padding: 12px; border: 1px solid gray; border-radius: 5px; background-color: #010101; display: flex; flex-direction: column">
        <div
            style="display: flex; align-items: center; justify-content: center">
            <div style="font-size: 31px; flex: 1">{{ todo.todoLists[props.idx].name }}</div>
            <div
                style="width: 34px; height: 34px; content: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 21 21'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' d='M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2m-7 2h14m-9 3v8m4-8v8'/%3E%3C/svg%3E&quot;)"></div>
        </div>
        <div
            style="display: flex; align-items: center; justify-content: center">
            <div>65%</div>
            <div style="font-size: 16px; text-align: center; flex: 1">
                24 of 100 unfinished
            </div>
            <div
                style="width: 46px; height: 25px; border: 1px solid gray; border-radius: 5px; background-color: #580000; display: flex; align-items: center; justify-content: center">
                Clear
            </div>
        </div>
        <div
            style="overflow: scroll; padding: 4px; border: 1px solid gray; border-radius: 5px; flex: 1">
            <div
            v-for="l in todo.todoLists[props.idx].todoItems"
            :key="l.value"    
            style="gap: 5px; display: flex; align-items: center; justify-content: center">
                <input
                    style="width: 33px; height: 34px; border: 1px solid gray; background-color: black!important"
                    type="checkbox" />
                <div @click="() => setTodoItemValue(0, 0, ',kkk' + new Date())" style="flex: 1">{{ l.value }}</div>
                <div
                    style="width: 20px; height: 20px; content: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 21 21'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' d='M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2m-7 2h14m-9 3v8m4-8v8'/%3E%3C/svg%3E&quot;)"></div>
            </div>
        </div>
        <div style="gap: 10px; display: flex">
            <input
                style="width: 208px; height: 47px; flex: 1"
                class="text-input"
                type="text" />
            <button
                style="width: 105px; height: 47px; border: 1px solid; border-radius: 18px; background-color: #000000; display: flex; align-items: center; justify-content: center"
                type="button">
                Add
            </button>
        </div>
    </div></template
>

<style>
    .text-input {
      border-radius: 18px;
      border: 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black!important;
    }

    * {box-sizing: border-box}
</style>
