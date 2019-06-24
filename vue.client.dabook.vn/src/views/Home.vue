<template>
  <div class="home h-100">
    <Welcome/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Welcome from '@/components/Welcome.vue' // @ is an alias to /src

@Component({
  components: {
    Welcome
  }
})
export default class Home extends Vue {}
</script>
