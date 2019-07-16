<template>
  <div class="home h-100">
    <Welcome02/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Welcome02 from '@/components/Welcome_02.vue' // @ is an alias to /src

@Component({
  components: {
    Welcome02
  }
})
export default class Home extends Vue {}
</script>
