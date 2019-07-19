//src/components/Navbar.vue
<template>
  <div>
     <div class="scroll-ngang w-100 px-0 mx-0">
                <span class="border-radius-100 scroll-select-item text-sm" v-for="item in data">
                    {{item.text}} <font-awesome-icon class="text-xs" :icon="icon" v-if="item.isIcon"/>
                </span>
            </div>
  </div>
</template>
<script>
export default {
    props:['data','icon'],
  name: "6CheckBoxGroup",
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
  computed: {
  }
};
</script>
<style lang="scss" scoped>
</style>
