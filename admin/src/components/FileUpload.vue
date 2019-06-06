<template>
  <div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <label class="show-label">{{label}}:</label>
      <div class="fields upload-component purple lighten-4">
        <label class="upload-label purple lighten-4" for="file">{{message}}</label>
        <input class="upload-input" id="file" type="file" ref="file" @change="onSelect">
        <v-btn
          @click="onSubmit"
          fab
          dark
          color="primary"
          class="submit-button"
          style="width: 30px !important;
  height: 30px !important;"
        >
          <i class="fas" v-bind:class="{ 'fa-check': isUpload,'fa-cloud-upload-alt': !isUpload }"></i>
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["routerPath","value","label"],
  name: "FileUpload",
  data() {
    return {
      file: "",
      message: "Select...",
      path: "",
      isUpload: false
    };
  },
  // "http://localhost:3000/upload"
  methods: {
    onSelect() {
      this.isUpload = false;
      const file = this.$refs.file.files[0];
      this.file = file;
      this.message = this.file.name;
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios
          .post(this.routerPath, formData)
          .then(response => {
            this.message = "Uploaded!!";
            this.path = response.data.filepath;
            this.isUpload = true;
            this.$emit('input', this.path)
          })
          .catch(function(error) {
          })
          .finally(function() {});
      } catch (error) {
        this.message = "Something went wrong!!";
      }
    }
  }
};
</script>

<style>
.file form{
  display: flex;
  align-items: flex-end;
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
.submit-butto {
  width: 30px !important;
  height: 30px !important;
}
</style>
