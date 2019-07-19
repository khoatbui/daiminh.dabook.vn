//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 m-0">
    <div class="col-12 p-0 m-0 text-sm flex-wrap justify-content-between">
        <span class="text-danger mx-2"> <font-awesome-icon class="ml-1" icon="fire-alt"/> 19001542 </span>
        <span class=" mx-2"> <a mailto="nhungbt@daiminhtravel.com"><font-awesome-icon class="ml-1" icon="envelope"/> nhungbt@daiminhtravel.com</a></span>
        <span class="text-danger mx-2"> <font-awesome-icon class="ml-1" icon="fire-alt"/> 024-5623777 / 778</span>
        <a data-toggle="collapse" href="#contactColapse" role="button" aria-expanded="false" aria-controls="contactColapse">
     <font-awesome-icon class="ml-1 float-right" icon="chevron-down"/>
  </a>
    </div>
    <div class="collapse w-100 mt-3 " id="contactColapse">
  <div class="card card-body p-0 border-0">
<div class="col-12">
          <div class="form-group text-left">
            <label class="mb-0" for="ifullname">
              <span class="text-sm font-weight-bold" v-bind:class="quickFormCheck.fullName">
                Full name
                <font-awesome-icon
                  class="text-danger"
                  icon="exclamation-circle"
                  v-if="(!quickFormCheck.isFail && quickFormCheck.fullName.length>0)"
                />
              </span>
            </label>
            <input
              type="text"
              class="form-control"
              id="ifullname"
              placeholder="Your name"
              v-model="quickContact.fullName"
            />
          </div>
          <div class="form-group text-left">
            <label class="mb-0" for="iemail">
              <span class="text-sm font-weight-bold" v-bind:class="quickFormCheck.email">
                Email
                <font-awesome-icon
                  class="text-danger"
                  icon="exclamation-circle"
                  v-if="(!quickFormCheck.isFail && quickFormCheck.email.length>0)"
                />
              </span>
            </label>
            <input
              type="email"
              class="form-control"
              id="iemail"
              placeholder="your@email.com"
              v-model="quickContact.email"
            />
          </div>
          <div class="form-group text-left">
            <label class="mb-0" for="iphone">
              <span class="text-sm font-weight-bold" v-bind:class="quickFormCheck.phone">
                Phone
                <font-awesome-icon
                  class="text-danger"
                  icon="exclamation-circle"
                  v-if="(!quickFormCheck.isFail && quickFormCheck.phone.length>0)"
                />
              </span>
            </label>
            <input
              type="tel"
              class="form-control"
              id="iphone"
              placeholder="+8498868686"
              v-model="quickContact.phone"
            />
          </div>
          <div class="form-group text-left">
            <label class="mb-0" for="imessage">
              <span class="text-sm font-weight-bold">Message</span>
            </label>
            <textarea
              class="form-control"
              id="imessage"
              rows="3"
              placeholder="Other request"
              v-model="quickContact.question"
            ></textarea>
          </div>
          <div class="w-100 text-right">
          <button class="btn btn-primary btn-sm">Send request</button>
          </div>
        </div>
          </div>
</div>
  </div>
</template>
<script>

export default {
  name: "ContactHostSection",
  props: ["current"],
  data() {
    return {
      quickContact: {
        fullName: "",
        email: "",
        phone: "",
        pickup: "",
        question: ""
      },
      quickFormCheck: {
        fullName: "",
        email: "",
        phone: "",
        isFail: true
      }
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
<style lang="scss">
</style>
