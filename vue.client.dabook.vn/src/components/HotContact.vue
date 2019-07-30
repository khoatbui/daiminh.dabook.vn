//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 m-0">
    <div class="col-12 p-0 m-0 text-sm flex-wrap justify-content-between">
      <span class="text-danger mx-2">
        <font-awesome-icon class="ml-1" icon="fire-alt" />19001542
      </span>
      <span class="mx-2">
        <a mailto="nhungbt@daiminhtravel.com">
          <font-awesome-icon class="ml-1" icon="envelope" />nhungbt@daiminhtravel.com
        </a>
      </span>
      <span class="text-danger mx-2">
        <font-awesome-icon class="ml-1" icon="fire-alt" />024-5623777 / 778
      </span>
      <a
        data-toggle="collapse"
        href="#contactColapse"
        role="button"
        aria-expanded="false"
        aria-controls="contactColapse"
      >
        <font-awesome-icon class="ml-1 float-right" icon="chevron-down" />
      </a>
    </div>
    <div class="collapse w-100 mt-3" id="contactColapse">
      <div class="card card-body p-0 border-0 border-radius-none bg-danger">
        <div class="col-12 p-4">
          <div class="form-group text-left">
            <label for="ifullname" class="mb-0 text-white">
              <span class="text-sm font-weight-bold">
                Full name
                <!---->
              </span>
            </label>
            <input type="text" id="ifullname" placeholder="Your name" class="form-control" />
          </div>
          <div class="form-group text-left">
            <label for="iemail" class="mb-0 text-white">
              <span class="text-sm font-weight-bold">
                Email
                <!---->
              </span>
            </label>
            <input type="email" id="iemail" placeholder="your@email.com" class="form-control" />
          </div>
          <div class="form-group text-left">
            <label for="iphone" class="mb-0 text-white">
              <span class="text-sm font-weight-bold">
                Phone
                <!---->
              </span>
            </label>
            <input type="tel" id="iphone" placeholder="+8498868686" class="form-control" />
          </div>
          <div class="form-group text-left text-white">
            <label for="imessage" class="mb-0">
              <span class="text-sm font-weight-bold">Message</span>
            </label>
            <textarea id="imessage" rows="3" placeholder="Other request" class="form-control"></textarea>
          </div>
          <div class="w-100 text-right">
            <button class="btn btn-primary btn-sm border-radius-100">Send request</button>
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
  created() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
