<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
<button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="material-icons">format_bold</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="material-icons">format_italic</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <i class="material-icons">strikethrough_s</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="material-icons">format_underlined</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <i class="material-icons">code</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <i class="material-icons">format_textdirection_r_to_l</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <span>H1</span>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <span>H2</span>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <span>H3</span>
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          @click="commands.heading({ level: 4 })"
        >
          <span>H4</span>
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 5 }) }"
          @click="commands.heading({ level: 5 })"
        >
          <span>H5</span>
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 6 }) }"
          @click="commands.heading({ level: 6 })"
        >
          <span>H6</span>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="material-icons">format_list_bulleted</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="material-icons">format_list_numbered</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="material-icons">format_quote</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <i class="material-icons">format_quote</i>
        </button>

        <button type="button" class="menubar__button" @click="commands.horizontal_rule">
          <span>hr</span>
        </button>
        <span class="divided"></span>
        <button type="button" class="menubar__button" @click="commands.undo">
          <i class="material-icons">undo</i>
        </button>

        <button type="button" class="menubar__button" @click="commands.redo">
          <i class="material-icons">redo</i>
        </button>
      </div>
    </editor-menu-bar>

    <div class="search">
      <input
        ref="search"
        @keydown.enter.prevent="editor.commands.find(searchTerm)"
        placeholder="Search …"
        type="text"
        v-model="searchTerm"
      />
      <input
        @keydown.enter.prevent="editor.commands.replace(replaceWith)"
        placeholder="Replace …"
        type="text"
        v-model="replaceWith"
      />
      <button class="button" @click="editor.commands.find(searchTerm)">
        Find
      </button>
      <button class="button" @click="editor.commands.clearSearch()">
        Clear
      </button>
      <button class="button" @click="editor.commands.replace(replaceWith)">
        Replace
      </button>
      <button class="button" @click="editor.commands.replaceAll(replaceWith)">
        Replace All
      </button>
    </div>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Search,
  Image,
} from 'tiptap-extensions'
export default {
    props:{
        dataParent:String,
    },
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      // searching: false,
      searchTerm: null,
      replaceWith: null,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Search({
            disableRegex: false,
          }),
        ],
        content: `
          <h2>
            Search and Replace
          </h2>
          <p>
            Search something. 🔍 Replace something. ✂️ Or replace all the things! 💥 That's it. That's how a search works. Good luck.
          </p>
        `,
        onUpdate: ({getHTML}) => {
          this.$emit("childtoparent", getHTML());
        }
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="css">
.editor {
  border: 1px solid seagreen;
  padding: 5px;
}
.menubar {
  padding-bottom: 5px;
  border-bottom: 1px solid seagreen;
  display: flex;
}
.menubar button {
  padding: 2px 4px !important;
  background-color: seagreen !important;
  color: #fff !important;
  min-width: 30px;
  height: 30px;
  border-right: 1px solid white;
  font-size: 14px;
}
.editor__content {
  width: 100% !important;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: scroll;
}
.ProseMirror {
  min-height: 100px;
  background-color: rgb(240, 248, 250);
  border-radius: 5px;
}
.editor__content:only-child,
.editor__content:first-child,
.editor__content img {
  max-width: 100%;
}
.divided {
  margin: 0 10px;
  flex-grow: 1;
}
</style>