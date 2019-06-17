<template>
  <div class="file">
    <div>
      <label class="show-label">{{label}}:</label>
    </div>
    <div class="fields upload-component purple lighten-4">
      <label class="upload-label purple lighten-4" for="file">{{message}}</label>
      <input
        class="upload-input"
        id="file"
        type="file"
        ref="file"
        multiple
        @change="onSelect($event)"
      >
      <a href="#" type="button" class="upload-btn" @click="onSubmit($event) ;return false;">
        <i class="fas" v-bind:class="{ 'fa-check': isUpload,'fa-cloud-upload-alt': !isUpload }"></i>
      </a>
    </div>
    <v-carousel height="300">
      <v-carousel-item
        class="background-cove"
        v-for="(item,index) in imgPaths"
        :key="index"
        :src="item"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["routerPath", "value", "label"],
  name: "FileUpload",
  data() {
    return {
      file: "",
      message: "Select...",
      path: "",
      isUpload: false,
      imgPaths: []
    };
  },
  // "http://localhost:3000/upload"
  methods: {
    onSelect(event) {
      this.file = [];
      this.isUpload = false;
      this.file = event.target.files;
      event.preventDefault;
    },
    onSubmit(event) {
      var formData = new FormData();
      for (var i = 0; i < this.file.length; i++) {
        let file = this.file[i];
        formData.append("file", file);
      }
      console.log(formData);
      try {
        axios
          .post(this.routerPath, formData)
          .then(response => {
            console.log(this.routerPath);
            this.message = `Uploaded!!`;
            this.path = response.data.filepath;
            this.imgPaths = response.data.filepath
              .substring(0, response.data.filepath.length - 1)
              .replace(/..\\admin\\public/g, "")
              .replace(/\\/g, "/")
              .split(";");
            this.isUpload = true;
            console.log(this.imgPaths);
            event.preventDefault();
            return false;
          })
          .catch(function(error) {})
          .finally(function() {});
      } catch (error) {
        this.message = "Something went wrong!!";
      }
    }
  }
};
</script>

<style>
.file form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.show-label {
  padding: 0px 4px;
  color: rgba(0, 0, 0, 0.54);
}
.upload-component {
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
}
.upload-label {
  color: #fff;
  padding: 2px 10px;
  margin: 0;
  border-radius: 10px;
  cursor: pointer;
}
.upload-input {
  display: none;
}
.upload-btn {
  width: 30px !important;
  height: 30px !important;
  background: #1976d2 !important;
  border: 1ps solid #1976d2 !important;
  color: #fff !important;
  border-radius: 50%;
  margin: 10px;
}
.upload-btn i {
  color: #fff !important;
}
.w-100 {
  width: 100%;
}
</style>
