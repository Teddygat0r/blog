<template>
    <div class="bg-slate-50 h-12 w-full rounded-md">
        <editor-content :editor="editor" class="m-auto h-full w-full"/>
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: "Title ...",
            emptyEditorClass:
            'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0',
        }),
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-xl mx-5 my-1 focus:outline-none'
        }
    }
})


</script>

<style scoped>

</style>