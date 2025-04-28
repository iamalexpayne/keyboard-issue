<script setup>
import { useAttrs, useTemplateRef, ref } from 'vue';

const model = defineModel();
const inputRef = useTemplateRef('input');
defineOptions({ inheritAttrs: false });
defineExpose({
    focus: () => inputRef.value.focus()
});
defineProps({
    label: {
        type: String,
        default: 'Label'
    },
    placeholder: {
        type: String,
        default: 'Enter something here'
    },
    error: {
        type: String,
        default: null
    },
    class: String
});

const id = useAttrs().id;
const type = useAttrs().type;
const toggleText = ref('show');

function toggleVisibility() {
    inputRef.value.type = inputRef.value.type === 'password' ? 'text' : 'password';
    toggleText.value = inputRef.value.type === 'password' ? 'show' : 'hide';
}

</script>


<template>
<div class="w-full" :class>
    <label :for="id" class="block text-lg font-medium">
        <div v-if="label" class="text-indigo-400 pb-2">{{ label }}</div>
        <div class="relative flex items-center flex-nowrap border bg-indigo-700 border-indigo-400 rounded focus-within:ring-2 ring-offset-2 ring-offset-indigo-950 ring-indigo-500 hover:bg-indigo-700  ease-in-out duration-200 transition-all focus-within:scale-[1.01] focus-within:bg-indigo-500 overflow-clip">
            <input ref="input" v-model="model" :placeholder v-bind="$attrs" class="text-lg py-2 px-3 w-full outline-0  disabled:cursor-not-allowed text-white placeholder:text-indigo-400 placeholder:font-light disabled:hover:bg-indigo-800 disabled:opacity-50 " />
            <button v-if="type === 'password'" @click="toggleVisibility" type="button" class="uppercase text-sm  py-3 text-white flex w-16 font-light justify-center">{{ toggleText }}</button>
        </div>
    </label>
    <p v-if="error" class="text-red-500 pt-2 pl-0.5">{{ error }}</p>
</div>
</template>