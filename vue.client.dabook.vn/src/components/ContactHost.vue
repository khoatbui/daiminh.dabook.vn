//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 m-0">
    <div class="col-12 p-0 m-0 text-sm flex-wrap justify-content-between">
        <span class="text-danger"> <font-awesome-icon class="ml-1" icon="fire-alt"/> 19001542 </span>
        <span> <a mailto="nhungbt@daiminhtravel.com"><font-awesome-icon class="ml-1" icon="envelope"/> nhungbt@daiminhtravel.com</a></span>
        <span> <font-awesome-icon class="ml-1" icon="fire-alt"/> 024-5623777 / 778</span>
    </div>
  </div>
</template>
<script>

export default {
  name: "ContactHostSection",
  props: ["current"],
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
<style lang="scss">
</style>
