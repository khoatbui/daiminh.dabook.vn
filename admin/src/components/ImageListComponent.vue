<template>
<div class="image-list">
   <h3>{{title}}</h3>
   <div class="scroll-ngang">
     <div class="card-component" v-for="(item,i) in data" v-bind:key="i">
        <v-icon class="absolute-item" small @click="deleteItem(item)">delete</v-icon>
         <img
            class="room-img"
            v-bind:src="`http://daiminh.dabook.vn/${item.filePath}`"
            alt
        />
     </div>
  </div>
</div>
</template>

<!-- Javascript -->
<script>
  export default {
    props: ["data","title"],
     name: "ImageListComponent",
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
        deleteItem(item) {
            this.$emit('getDeleteFile', item)
        }
    }
  }

</script>

<!-- SASS styling -->
<style lang="scss">
.scroll-ngang{
    display: flex;
    flex-wrap: nowrap;
}
.card-component{
    position: relative;
    margin:10px;
}
.absolute-item{
    position: absolute;
    top:10px;
    right: 10px;
    color: red;
    cursor:pointer;
    z-index: 100;
}
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
.img-list li{
  height: 150px;
  min-height: 150px;
  widows: auto;
  padding:10px;
}
.img-list li img{
  height: 100%;
  width: auto;
}
.img-list img{
  width: 100%; 
  height: auto;
}
.room-img {
  height: 200px;
  width: 200px;
}
.scroll-ngang {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.scroll-ngang li {
  display: inline-block;
}
</style>