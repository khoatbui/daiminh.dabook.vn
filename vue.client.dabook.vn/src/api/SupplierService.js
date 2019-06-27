import Api from '@/api/Api'

var supplierservice = {
  getAllSupplier (params) {
    return Api().get('hotel/gethotelbysupplier/' + params.id)
  },

  getAllPromoteSupplier () {
    return Api().get('supplier/getpromotesupplier/')
  },

  getSupplierDetailById (params) {
    console.log(params)
    return Api().get('hotel/gethoteldetailbyid/' + params.id)
  }
}

export default supplierservice
