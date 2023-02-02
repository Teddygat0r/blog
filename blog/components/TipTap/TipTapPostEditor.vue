<template>
    <div
        class="border border-slate-700 bordre-opacity-70 rounded-md w-full"
        v-if="editor">
        <div class="flex">
            <div class="m-auto flex gap-5 mt-2" id="Fixed Menu">
            <button
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
                <i class="ri-bold"></i>
            </button>
            <button
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
                <i class="ri-italic"></i>
            </button>
            <button
                @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'is-active': editor.isActive('underline') }">
                <i class="ri-underline"></i>
            </button>
            <button
                @click="setLink()"
                :class="{ 'is-active': editor.isActive('link') }">
                <i class="ri-links-line"></i>
            </button>
            <button
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
                <i class="ri-chat-quote-line"></i>
            </button>
            <button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
                <i class="ri-list-unordered"></i>
            </button>
            <button
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }">
                <i class="ri-list-ordered"></i>
            </button>
            <button @click="editor.chain().focus().setHorizontalRule().run()">
                <i class="ri-separator"></i>
            </button>
            <button @click="addImage()">
                <i class="ri-image-2-line"></i>
            </button>
            <button
                @click="editor.chain().focus().setTextAlign('left').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                <i class="ri-align-left"></i>
            </button>
            <button
                @click="editor.chain().focus().setTextAlign('center').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                <i class="ri-align-center"></i>
            </button>
            <button
                @click="editor.chain().focus().setTextAlign('right').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                <i class="ri-align-right"></i>
            </button>
            <button
                @click="editor.chain().focus().setTextAlign('justify').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                <i class="ri-align-justify"></i>
            </button>
            <button
                @click="addVideo()">
                <i class="ri-youtube-line"></i>
            </button>
        </div>
        </div>
        <div class="bg-slate-50 min-h-[500px] w-full rounded-sm">
            <editor-content :editor="editor" class="m-auto h-full w-full"/>
        </div>
    </div>
    <div
        class="character-count text-xs text-slate-600 text-opacity-50"
        v-if="editor">
        {{ editor.storage.characterCount.characters() }} characters
        {{ editor.storage.characterCount.words() }} words
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Focus from "@tiptap/extension-focus";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";

const editor = useEditor({
    content: null,
    extensions: [
        StarterKit.configure({
            bold: {
                HTMLAttributes: {
                    class: "font-bold",
                },
            },
            blockquote: {
                HTMLAttributes: {
                    class: "pl-1 border-l-3 border-slate-500",
                },
            },
            bulletList: {
                HTMLAttributes: {
                    class: "list-disc pl-6",
                },
            },
            orderedList: {
                HTMLAttributes: {
                    class: "list-decimal pl-8",
                },
            },
        }),
        CharacterCount,
        Focus,
        Image,
        Link,
        Placeholder.configure({
            emptyEditorClass:
            'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0',
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph']
        }),
        Underline,
        Youtube,
    ],
    editorProps: {
        attributes: {
            class: 'prose mx-5 my-1 focus:outline-none'
        }
    }
});

const setLink = () => {
    const previousUrl = editor.value.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
        editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
    }

    editor.value
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
};

const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
        editor.value
            .chain()
            .focus()
            .setImage({ src: url, alt: "ballso" })
            .run();
    }
};

const addVideo = () => {
    const url = window.prompt("URL")

    editor.value.commands.setYoutubeVideo({
        src: url,
    })
}

onMounted(() => {});
</script>

<style scoped>
.is-active {
    color: red;
}


</style>
