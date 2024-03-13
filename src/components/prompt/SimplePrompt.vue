<script lang="ts" setup>

    import { useStore } from '@nanostores/vue';
    import { cancel, ok, input, prompt, PromptModal } from './prompt.js'
    import { Ref } from 'vue';

    const prt: Readonly<Ref<PromptModal>> = useStore(prompt)
</script>

<template>
    <div
        @click="cancel"
        style="position: fixed; 
    top:0; left:0; 
    width: 100%; height:100%; 
    background-color: rgba(255,255,255,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    "
        v-if="prt?.visible">
        <div
            style="position: static; width: 376px"
            class="prompt-container"
            @click.stop="">
            <div class="prompt-title-wrap">
                <div style="flex: 1">{{prt.title}}</div>
                <div
                    style="width: 26px; height: 26px"
                    class="close-cross"
                    @click="cancel"></div>
            </div>
            <div class="prompt-input-wrap">
                <input
                    style="width: 208px; height: 47px"
                    class="text-input"
                    type="text"
                    @input="(e) => input((<HTMLInputElement>e.target).value)"
                    @keydown.enter="ok"
                    @keydown.esc="cancel"
                    id="promptInput"
                    :value="prt.value" />
                <button
                    style="width: 105px; height: 47px; border: 1px solid; border-radius: 18px; background-color: #000000; display: flex; align-items: center; justify-content: center"
                    type="button"
                    @click="ok">
                    {{prt.button}}
                </button>
            </div>
        </div>
    </div>
</template>

<style>
    .text-input {
      border-radius: 18px;
      border: 1px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black!important;
    }

    .close-cross {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z'/%3E%3C/svg%3E")
    }

    .prompt-container {
      gap: 15px;
      padding: 9px;
      border: 1px solid gray;
      border-radius: 5px;
      background-color: #000000;
      display: flex;
      flex-direction: column
    }

    .prompt-title-wrap {
      display: flex;
      align-items: center
    }

    .prompt-input-wrap {
      justify-content: center;
      gap: 10px;
      display: flex;
      padding-bottom: 10px
    }

    * {box-sizing: border-box}
</style>
