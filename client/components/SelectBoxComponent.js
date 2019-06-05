// Define a new component called button-counter
Vue.component('select-box', {
    props: ['itemlist'],
    data: function () {
      return {
        selectedItem:{}
      }
    },
    template: `<div class="popover-group w-100 w-100">
    <input type="text" class="form-control d-inline"
        placeholder="Hotel..."
        @click="e => e.target.parentNode.nextElementSibling.classList.toggle('show')" />
    <div class="popover-custom  w-100">
        <div class="row m-1 border-bottom drop-item" v-for="item in itemlist">
            <div class="col-12" @click="select(item)">
               {{item.value}}
            </div>
        </div>
    </div>
</div>`,
    methods:{
      select(item) {
          console.log(itemlist);
         this.selectedItem=item;
         event.target.parentNode.classList.toggle('show');
      }
    }
  })
