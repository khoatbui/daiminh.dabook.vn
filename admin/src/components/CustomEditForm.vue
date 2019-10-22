<template>
  <div class="editor">
    <editor-menu-bubble
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <button
          class="menububble__button"
          type="button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <span>
            <b>B</b>
          </span>
        </button>

        <button
          class="menububble__button"
          type="button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <span>
            <i>I</i>
          </span>
        </button>
        <!-- <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <span>H1</span>
        </button>

        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <span>H2</span>
        </button>

        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <span>H3</span>
        </button>
        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          @click="commands.heading({ level: 4 })"
        >
          <span>H4</span>
        </button> -->
        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 5 }) }"
          @click="commands.heading({ level: 5 })"
        >
          <span>H5</span>
        </button>
        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 6 }) }"
          @click="commands.heading({ level: 6 })"
        >
          <span>H6</span>
        </button>
        <button
          class="menububble__button"
          type="button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <span>< ></span>
        </button>
      </div>
    </editor-menu-bubble>
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

        <!-- <button
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
        </button> -->
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

        <button class="menubar__button" type="button" @click="openDialog">
          <i class="material-icons">image</i>
        </button>
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
        class="input"
      />
      <input
        @keydown.enter.prevent="editor.commands.replace(replaceWith)"
        placeholder="Replace …"
        type="text"
        v-model="replaceWith"
        class="input"
      />
      <button class="button" type="button" @click="editor.commands.find(searchTerm)">Find</button>
      <button class="button" type="button" @click="editor.commands.clearSearch()">Clear</button>
      <button class="button" type="button" @click="editor.commands.replace(replaceWith)">Replace</button>
      <button
        class="button"
        type="button"
        @click="editor.commands.replaceAll(replaceWith)"
      >Replace All</button>
      <span class="divided"></span>
      <button class="button" type="button" @click="getOldData">Get old data</button>
    </div>
    <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu }">
      <div
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >
        <!-- <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >H1</button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >H2</button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >H3</button>
        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          @click="commands.heading({ level: 4 })"
        >H4</button> -->
        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 5 }) }"
          @click="commands.heading({ level: 5 })"
        >H5</button>
        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.heading({ level: 6 }) }"
          @click="commands.heading({ level: 6 })"
        >H6</button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="material-icons">format_list_bulleted</i>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="material-icons">format_list_numbered</i>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="material-icons">format_quote</i>
        </button>

        <button
          class="menubar__button"
          type="button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <i class="material-icons">code</i>
        </button>
      </div>
    </editor-floating-menu>
    <editor-content class="editor__content" :editor="editor" />
    <input
      type="file"
      :id="`imgupload${idComponent}`"
      style="visibility: hidden"
      v-on:change="previewFile(editor.commands.image)"
    />
    <div class="note">
      <p>Dung lượng ảnh từ 50kb ~500kb. Nếu dung lượng lớn vui lòng convert ảnh bằng <a href="https://bulkresizephotos.com/en" target="_blank">https://bulkresizephotos.com/en</a> trước khi upload lên hệ thống</p>
    </div>
  </div>
</template>

<script>
import {
  Editor,
  EditorContent,
  EditorMenuBar,
  EditorMenuBubble,
  EditorFloatingMenu
} from "tiptap";
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
  Image,
  Search
} from "tiptap-extensions";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  name: "CustomEditForm",
  props: {
    dataParent: String,
    idComponent:String,
  },
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    EditorFloatingMenu
  },
  beforeMount() {
    this.editor.setContent(this.dataParent);
  },
  data() {
    return {
      searchTerm: null,
      replaceWith: null,
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
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
            disableRegex: false
          })
        ],
        content: ``,
        onUpdate: ({ getHTML }) => {
          this.$emit("childtoparent", getHTML());
        }
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    openDialog() {
      window.document.getElementById(`imgupload${this.idComponent}`).click();
      return false;
    },
    getOldData() {
      this.editor.setContent(this.dataParent);
      console.log(this.editor);
    },
    showImageModal(command) {
      this.$refs.imageModal.showModal({ command });
    },
    previewFile(commands) {
      var preview = document.querySelector("img");
      var sizeImg=document.getElementById(`imgupload${this.idComponent}`).files[0].size;
      if (sizeImg>=1572864) {
        alert(`Kich thuoc anh qua lon (${sizeImg/(1024*1024)} mb), vui long giam kich thuoc anh`)
      }
      else{
      getBase64(document.getElementById(`imgupload${this.idComponent}`).files[0]).then(data =>{
        console.log(data);
        commands({src: data })
      }
      );
      }
    }
  }
};
</script>

<style>
.editor {
  border: 1px solid seagreen;
  padding: 5px;
}
.menubar,
.search {
  padding-bottom: 5px;
  border-bottom: 1px solid seagreen;
  display: flex;
}
.menubar button,
.button {
  padding: 2px 4px !important;
  background-color: seagreen !important;
  color: #fff !important;
  min-width: 30px;
  height: 30px;
  border-right: 1px solid white;
  font-size: 14px;
}
.editor__floating-menu {
  display: flex;
  left: 30px;
}
.editor__floating-menu .menubar__button {
  padding: 2px !important;
  background-color: #ddd !important;
  color: #333 !important;
  width: 30px;
  height: 30px;
  border-right: 1px solid white;
  font-size: 14px;
  border-radius: 50% !important;
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
.search {
  padding: 5px 0;
}
.input {
  padding: 5px;
  border: 0.5px solid gray;
  border-radius: 2px;
  margin: 0 3px 0 0;
}
.editor {
  position: relative;
}
.editor__floating-menu {
  position: absolute;
  z-index: 1;
  margin-top: -0.25rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
}
.editor__floating-menu.is-active {
  opacity: 1;
  visibility: visible;
}
.menububble {
  opacity: 0;
  position: absolute;
  z-index: 100;
  background: #333;
  color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menububble__button {
  margin: 4px;
  width: 30px;
}
.menububble.is-active {
  opacity: 1 !important;
}
.note{
  position: absolute;
  bottom: -10px;
  color: red;
  font-size: 0.8rem;
}
</style>
