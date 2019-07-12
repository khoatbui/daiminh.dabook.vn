<template>
  <figure v-lazyload class="image__wrapper">
    <img
      v-bind:class="classname"
      :data-url="source"
      alt="random image"
    >
  </figure>
</template>
<script>
export default {
  name: "ImageItem",
  props: {
    source: {
      type: String,
      required: true
    },
classname:{
        type:String,
        required:true
    }
  }
};
</script>
