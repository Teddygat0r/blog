<template>
    <div class="bg-slate-50 min-h-12 max-h-24 w-full rounded-md">
        <editor-content :editor="editor" class="m-auto h-full w-full"/>
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: "Title ...",
            emptyEditorClass:
            'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0',
        }),
        CharacterCount.configure({
            limit: 120
        })
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-xl mx-5 my-1 focus:outline-none text-clip'
        }
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    }
})


</script>

<style scoped>

</style>