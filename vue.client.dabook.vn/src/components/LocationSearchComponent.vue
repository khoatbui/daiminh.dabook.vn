<template>
  <div class="input-group border-radius-100 w-100 search">
    <div class="input-group-prepend">
      <span class="input-group-text border-left-radius-100" id="basic-addon1">
        <a @click="naviBack">
          <font-awesome-icon class="ml-1 text-danger" icon="arrow-left"/>
        </a>
      </span>
    </div>
    <input
      type="text"
      class="form-control border-right-radius-100"
      v-bind:placeholder="$t('search_search')"
      aria-label="Username"
      aria-describedby="basic-addon1"
    >
    <ul class="dropdown-menu" style="width:100%">
        <li v-for="suggestion in matches"
            v-bind:class="{'active': isActive($index)}"
            @click="suggestionClick($index)"
        >
            <a href="#">{{ suggestion }}</a>
        </li>
    </ul>
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
