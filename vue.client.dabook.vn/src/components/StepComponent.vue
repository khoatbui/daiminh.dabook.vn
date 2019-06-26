/* eslint-disable */
<template>
    <div class="container-step">
      <ul class="progressbar-step">
          <li class="active-step"></li>
          <li></li>
          <li></li>
  </ul>
    </div>
</template>
<script>
export default {
  props: ["id", "currentstep", "totalstep"],
  name: "StepCompoment",
  created() {},
  methods: {
   
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
.container-step {
      width: 600px;
      margin: 100px auto; 
  }
  .progressbar-step {
      counter-reset: step;
  }
  .progressbar-step li {
      list-style-type: none;
      width: 25%;
      float: left;
      font-size: 12px;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      color: #7d7d7d;
  }
  .progressbar-step li:before {
      width: 30px;
      height: 30px;
      content: counter(step);
      counter-increment: step;
      line-height: 30px;
      border: 2px solid #7d7d7d;
      display: block;
      text-align: center;
      margin: 0 auto 10px auto;
      border-radius: 50%;
      background-color: white;
  }
  .progressbar-step li:after {
      width: 100%;
      height: 2px;
      content: '';
      position: absolute;
      background-color: #7d7d7d;
      top: 15px;
      left: -50%;
      z-index: -1;
  }
  .progressbar-step li:first-child:after {
      content: none;
  }
  .progressbar-step li.active-step {
      color: green;
  }
  .progressbar-step li.active-step:before {
      border-color: #55b776;
  }
  .progressbar-step li.active-step + li:after {
      background-color: #55b776;
  }
</style>
