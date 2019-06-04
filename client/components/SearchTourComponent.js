// Define a new component called button-counter
Vue.component('search-tour', {
    data: function () {
      return {
        searchbox: ""
      }
    },
    template: `<div class="card">
    <div class="card-body">
        <div class="row exchange-parent">
            <div class="col-12 col-md-9 col-lg-10">
                <div class="form-group bmd-form-group"> <label class="bmd-label-floating">Địa điểm, sở
                        thích...</label>
                    <input v-model="searchbox" type="text" class="form-control" aria-label="Username"> </div>
            </div>
            <div class="col-12 col-md-3 col-lg-2 d-flex justify-content-center align-items-center">
                <button class="btn btn-info btn-search-fly w-100 btn-round " @click="toursearch"><i
                        class="fas fa-umbrella-beach"></i>
                    Tìm tours</button>
            </div>
        </div>
    </div>
</div>`,
    methods:{
      toursearch() {
        if (this.searchbox.length > 0) {
          window.location = "../tour/tourlist.html?searchbox-search=" + this.searchbox;
        } else {
          return;
        }
      }
    }
  })
