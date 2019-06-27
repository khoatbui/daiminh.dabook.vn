<template>
  <div class="language-component">
    <button class="btn btn-lang m-0 p-0" @click="changeLocale">
      <img v-bind:src="lang.currentlang.img" alt="Language">
    </button>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
export default {
  name: "LanguageComponent",
  created() {},
  methods: {
    changeLocale() {
        if (this.lang.currentlang.langcode==="en") {
            this.lang.currentlang=this.lang.langlist[0];
        }
        else if (this.lang.currentlang.langcode==="ko") {
            this.lang.currentlang=this.lang.langlist[2];
        }
        else{
            this.lang.currentlang=this.lang.langlist[1];
        }
      i18n.locale = this.lang.currentlang.langcode;
    }
  },
  data: function() {
    return {
      lang: {
          langlist:[
        {
          img: "img/language/vietnam.png",
          langcode: "vi"
        },
        {
          img: "img/language/south-korea.png",
          langcode: "ko"
        },
        {
          img: "img/language/united-kingdom.png",
          langcode: "en"
        }
      ],
      currentlang:{
          img: "img/language/united-kingdom.png",
          langcode: "en"
        }}
    };
  }
};
</script>
<style lang="scss">
.language-component .btn-lang {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  padding: 0 !important;
  line-height: 30px;
  overflow: hidden;
  cursor: pointer;
}
.language-component .btn-lang img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.language-component .main-nav-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
