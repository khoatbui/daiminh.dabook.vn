<template>
  <div>
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Bootstrap</strong>
        <small class="text-muted">2 seconds ago</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">Heads up, toasts will stack automatically</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["id", "radius", "placeholder"],
  name: "CustomerBookedAlert",
  created() {
    this.initialize();
  },
  methods: {
    initialize: function() {
    //   $(document).ready(function() {
    //       document.getSelection(".toast")
    //     $().toast("show");
    //   });
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
</style>
