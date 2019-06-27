<template>
  <div class="input-group border-radius-100 w-100 search">
    <div class="input-group-prepend">
      <span class="input-group-text border-left-radius-100" id="basic-addon1">
        <a @click="naviBack">
          <font-awesome-icon class="ml-1" icon="chevron-left"/>
        </a>
      </span>
    </div>
    <input
      type="text"
      class="form-control border-right-radius-100"
      placeholder="Search"
      aria-label="Username"
      aria-describedby="basic-addon1"
    >
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["id", "radius", "placeholder"],
  name: "LocationSearchComponent",
  created() {},
  methods: {
    naviBack() {
      this.$router.go(-1);
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
.search input {
  border-left: none;
}
.search input:focus {
  border-left: none !important;
}
</style>
