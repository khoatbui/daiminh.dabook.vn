<template>
   <div class="container-fluid h-100">
      <div class="row h-100 align-items-center">
        <div
          class="col-12 align-self-stretch bg-primary top-brand d-flex justify-content-center align-items-center"
        >
        <img src="img/main_logo_text.png" class="main-logo" />
        </div>
        <div class="col-12 p-4 text-center">
          <b-button variant="primary" class="btn-round-50 pl-4 pr-4" @click="redirectMain">Let's go</b-button>
        </div>
      </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
    };
  },
  methods:{
    redirectMain:function(){
      this.$router.push({ path: 'main' })
    }
  }
};
</script>
<style lang="scss">
.top-brand {
  border-bottom-left-radius: 25%;
  border-bottom-right-radius: 25%;
  height: 50%;
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>