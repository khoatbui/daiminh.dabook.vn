//src/components/Navbar.vue
<template>
  <div>
     <div class="scroll-ngang w-100 px-0 mx-0">
       <label  class="select-container"  v-for="item in data">
         <input class="checkbox-group-input" type="radio" :name="name"  @click="$emit('select', item)">
         <span class="border-radius-100 scroll-select-item text-sm checkmark">
                    {{item.text}} <font-awesome-icon class="text-xs" :icon="icon" v-if="item.isIcon"/>
                </span>
       </label >
            </div>
  </div>
</template>
<script>
export default {
    props:['data','name','icon','currentItem'],
  name: "CheckBoxGroup",
  data() {
    return {
      selectedItem:""
    };
  },
  created() {
  },
  methods: {
  },
  computed: {
    select(){
      console.log(this.selectedData);
    }
  }
};
</script>
<style lang="scss" scoped>
/* The container */
.select-container {
  display: inline;
  position: relative;
  cursor: pointer;
  margin:1px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute !important;
  opacity: 0!important;
  cursor: pointer!important;
}

/* Create a custom radio button */
.checkmark {
  position: relative;
  top: 0;
  left: 0;
  background-color: #eee;
  border-radius: 50%;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
  color:#FFFFFF;
}
.checkbox-group-input{
  opacity: 0 !important;
}
/* Create the indicator (the dot/circle - hidden when not checked) */
// .checkmark:after {
//   content: "";
//   position: absolute;
//   display: none;
// }

/* Show the indicator (dot/circle) when checked */
// .container input:checked ~ .checkmark:after {
//   display: block;
// }

/* Style the indicator (dot/circle) */
// .container .checkmark:after {
//  	top: 9px;
// 	left: 9px;
// 	width: 8px;
// 	height: 8px;
// 	border-radius: 50%;
// 	background: white;
// }
</style>
