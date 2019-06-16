//http://103.237.144.222:3000
const apiUrl = 'http://103.237.144.222:3000';

// Now the app has started!
const AXIOS = axios.create({
    baseURL: `http://localhost:8082/Fleet-App/api/`,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token,
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': true
    }
})


var urlParams = new URLSearchParams(window.location.search);
var app = new Vue({
    el: '#app',
    data: {
        uiAction:{
            showDetailRoomType:false
        },
        bookingstep: {
            find: true,
            confirm: false,
            finish: false
        }, //FIND => CONFIRM => FINISH
        formCheck: {
            name: "",
            email: "",
            phone: "",
            isFail: true
        },
        bookingrequest: {
            supplier: {
                "supplierCode": "VIN"
            },
            hotel: {},
            roomTypes: [],
            packages: [],
            optionServices: [],
            customerInfo: {
                name: "",
                email: "",
                phone: "",
                other: ""
            },
            orderCode: "",
            total:{
                totalPrice: 20000,
                totalRoom: 0,
                totalGuest:{
                    totalGolfer:0,
                    totalNonGolfer:0,
                    totalAdult:0,
                    totalChildren:0
                },
                totalNight:0
            },
            time: {
                checkin: moment().format('DD-MM-YYYY'),
                checkout: moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
            }
        },
        selection: {
            suppliers: [{
                "supplierCode": "FLC"
            },
            {
                "supplierCode": "VIN"
            }],
            hotels: [],
            packages: [],
            roomTypes: [],
            optionServices: [],
            roomTypeSelect: [],
            adult: {
                golfer: { "qty": 0 },
                nongolfer: { "qty": 0 },
                adult: { "qty": 0 },
                children: { "qty": 0 },
            }
        },
        bank: {
            banks: [],
            selectedBank: {}
        },
    },
    created() {
        this.initialize();
        // this.getOptionServiceBySupplierId();
    },
    methods: {
        initialize() {
            AXIOS.get(apiUrl + '/supplier', { crossdomain: true })
                .then((response) => {
                    this.selection.suppliers = response.data;
                    if (urlParams.has('supplierCode')) {
                        this.selection.suppliers.forEach(element => {
                            if (element.supplierCode == urlParams.get('supplierCode')) {
                                element.isActive = true;
                                this.bookingrequest.supplier = element;
                                this.getHotelList(this.bookingrequest.supplier);
                            }
                            else{
                                element.isActive = false;
                            }
                        });
                      }
                      else{
                        response.data.forEach(element => {
                            if (element.isActive == true) {
                                this.bookingrequest.supplier = element;
                                this.getHotelList(this.bookingrequest.supplier);
                            }
                        });
                      }
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });

            AXIOS.get(apiUrl + '/payments', { crossdomain: true })
                .then((response) => {
                    this.bank.banks = response.data;
                    this.bank.selectedBank = response.data[0];
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
        changeSupplier(sup) {
            this.bookingrequest.supplier = sup;
            this.getHotelList(this.bookingrequest.supplier);
            // this.getOptionServiceBySupplierId();
        },
        getHotelList(sup) {
            AXIOS.get(apiUrl + '/hotel/combobox/hotelbysuppliercode/' + sup.supplierCode, { crossdomain: true })
                .then((response) => {
                    this.selection.hotels = response.data;
                    this.bookingrequest.hotel = response.data[0];
                    this.getRoomTypeByHotel();
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
        getRoomTypeByHotel() {
            AXIOS.get(apiUrl + `/roomtype/combobox/roomtype/${this.bookingrequest.hotel._id}`, { crossdomain: true })
                .then((response) => {
                    this.selection.roomTypes = [];
                    response.data.forEach(element => {
                        this.selection.roomTypes.push({ "roomType": element, qty: 0 })
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
        getPackageByHotel() {
            AXIOS.get(apiUrl + `/packagehotelrel/combobox/packagebyhotelroomtype/hotel/${this.bookingrequest.hotel._id}/roomType/${this.bookingrequest.roomType._id}`, { crossdomain: true })
                .then((response) => {
                    this.selection.packages = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
        getPackageByMultiHotel() {
            var reqBody = {
                roomTypeId: this.bookingrequest.roomTypes,
                hotelId: this.bookingrequest.hotel._id
            };
            AXIOS.post(apiUrl + `/packagehotelrel/combobox/packagebymultihotelroomtype`, reqBody)
                .then(response => {
                    this.selection.packages = [];
                    response.data.forEach(element => {
                        this.selection.packages.push({ "package": element, qty: 0 })
                    });
                })
                .catch(function (error) {
                })
                .finally(function () { });
        },
        getOptionServiceBySupplierId() {
            AXIOS.get(apiUrl + '/optionservice/combobox/optionbysupplierid/' + this.bookingrequest.supplier._id, { crossdomain: true })
                .then((response) => {
                    this.selection.optionServices = [];
                    response.data.forEach(element => {
                        this.selection.optionServices.push({ "optionServices": element, qty: 0 })
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
        getOptionServiceBySupplierCode() {
            AXIOS.get(apiUrl + '/optionservice/combobox/optionbysuppliercode/' + this.bookingrequest.supplier.supplierCode, { crossdomain: true })
                .then((response) => {
                    this.selection.optionServices = [];
                    response.data.forEach(element => {
                        this.selection.optionServices.push({ "optionServices": element, qty: 0 })
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
        searchHotel() {
            this.bookingstep.find = true;
            this.bookingstep.confirm = true;
            this.bookingrequest.time.checkin = document.getElementById('checkin').value;
            this.bookingrequest.time.checkout = document.getElementById('checkout').value;
            // AXIOS.post(apiUrl + "/packagehotelrel/price", this.bookingrequest)
            //     .then(response => {
            //         this.bookingrequest.price = response.data[0].price;
            //     })
            //     .catch(function (error) {
            //     })
            //     .finally(function () { });
        },
        reserveHotel() {
            if (this.bookingrequest.customerInfo.name.length === 0) {
                this.formCheck = {
                    name: "text-rose",
                    email: "",
                    phone: "",
                    isFail: false
                }
            }
            else if (this.bookingrequest.customerInfo.email.length === 0) {
                this.formCheck = {
                    name: "",
                    email: "text-rose",
                    phone: "",
                    isFail: false
                }
            }
            else if (this.bookingrequest.customerInfo.phone.length === 0) {
                this.formCheck = {
                    name: "",
                    email: "",
                    phone: "text-rose",
                    isFail: false
                }
            }
            else {
                this.formCheck = {
                    name: "",
                    email: "",
                    phone: "",
                    isFail: true
                }
                this.bookingstep.find = true;
                this.bookingstep.confirm = true;
                this.bookingstep.finish = true;
                AXIOS.post(apiUrl + '/mail/hotel-booking', this.bookingrequest)
                    .then(response => {
                        this.bookingrequest.orderCode = response.data;

                    })
                    .catch(function (error) {
                    })
                    .finally(function () { });


            }
        },
        back() {
            this.bookingstep.find = true;
            this.bookingstep.confirm = false;
            this.bookingstep.finish = false;
        },
        showBank(bank) {
            this.selectedBank = this.banks.find(x => x.bankCode.toUpperCase() === bank.toUpperCase())
        },
        showPoposer() {

        },
        plusPerson(perItem) {
            perItem.qty++;
        },
        minusPerson(perItem) {
            perItem.qty--;
        },
        savePerson() {
            this.bookingrequest.adult = JSON.parse(JSON.stringify(this.selection.adult));

        },
        closePerson() {

            this.selection.adult = JSON.parse(JSON.stringify(this.bookingrequest.adult));
        },
        plusRoomType(item) {
            item.qty++;
        },
        minusRoomType(item) {
            item.qty--;
        },
        saveRoomType() {
            this.selection.roomTypeSelect = [];
            console.log(this.selection.roomTypes);
            this.selection.roomTypes.forEach(element => {
                if (element.qty > 0) {
                    for (let index = 0; index < element.qty; index++) {
                        AXIOS.get(apiUrl + `/packagehotelrel/combobox/packagebyhotelroomtype/hotel/${this.bookingrequest.hotel._id}/roomType/${element.roomType._id}`, { crossdomain: true })
                            .then((response) => {
                                AXIOS.get(apiUrl + '/optionservice/combobox/optionbysupplierid/' + this.bookingrequest.supplier._id, { crossdomain: true })
                                    .then((res) => {

                                        this.selection.roomTypeSelect.push({
                                            "roomType": JSON.parse(JSON.stringify(element)),
                                            "package": response.data,
                                            "optionService": res.data,
                                            "guest":{
                                                "adult":{
                                                    name:"adult",
                                                    qty:0},
                                                "golfer":{
                                                    name:"golfer",
                                                    qty:0},
                                                "nongolder":{
                                                    name:"nongolder",
                                                    qty:0},
                                                "children":{
                                                    "less4":{
                                                        name:"less4",
                                                        qty:0},
                                                    "less12":{
                                                        name:"less12",
                                                        qty:0}
                                                },
                                                "totalGuest":0
                                            }
                                        })
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                                    .finally(() => {
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                            .finally(() => {
                            });
                    }
                }
            });
        },
        closeRoomType() {
            this.selection.roomTypeSelect.forEach(element => {
                if (element.qty > 0) {
                    this.selection.roomTypes.find(obj => {
                        return obj.roomType.roomCode === element.roomType.roomCode
                    }).qty = JSON.parse(JSON.stringify(element.qty));
                }
            });
            if (this.selection.roomTypeSelect.length == 0) {
                this.selection.roomTypes.forEach(element => {
                    element.qty = 0;
                });
            }
        },
        savePackageAdultOptionService(){
            this.bookingrequest.roomTypes=[];
            this.selection.roomTypeSelect.forEach(element => {
                this.bookingrequest.roomTypes.push({
                    roomType:element.roomType,
                    package:element.selectedPackage,
                    optionService:element.selectedOptionService,
                    guest:element.guest
                })
            });
        },
        plusPackage(item) {
            item.qty++;
        },
        minusPackage(item) {
            item.qty--;
        },
        savePackage() {
            this.selection.packages.forEach(element => {
                if (element.qty > 0) {
                    this.bookingrequest.packages.push(JSON.parse(JSON.stringify(element)))
                }
            });
            this.getPackageByMultiHotel();
        },
        closePackage() {
            this.bookingrequest.packages.forEach(element => {
                if (element.qty > 0) {
                    this.selection.packages.find(obj => {
                        return obj.package.packageCode === element.package.packageCode
                    }).qty = JSON.parse(JSON.stringify(element.qty));
                }
            });
            if (this.bookingrequest.packages.length == 0) {
                this.selection.packages.forEach(element => {
                    element.qty = 0;
                });
            }
        },
        plusOptionService(item) {
            item.qty++;
        },
        minusOptionService(item) {
            item.qty--;
        },
        saveOptionService() {
            this.selection.optionServices.forEach(element => {
                if (element.qty > 0) {
                    this.bookingrequest.optionServices.push(JSON.parse(JSON.stringify(element)))
                }
            });
        },
        closeOptionService() {
            this.bookingrequest.optionServices.forEach(element => {
                if (element.qty > 0) {
                    this.selection.optionServices.find(obj => {
                        return obj.optionServices.optionServiceCode === element.optionServices.optionServiceCode
                    }) = JSON.parse(JSON.stringify(element));
                }
            });
            if (this.bookingrequest.optionServices.length == 0) {
                this.selection.optionServices.forEach(element => {
                    element.qty = 0;
                });
            }
        }
    },
    computed: {
        // a computed getter
        totalPrice: function () {
            var total = 0;
            var a = moment(this.bookingrequest.time.checkin, 'D-M-YYYY');
            var b = moment(this.bookingrequest.time.checkout, 'D-M-YYYY');
            var diffDays = b.diff(a, 'days');
            this.bookingrequest.roomTypes.forEach(element => {
                if (typeof element.package !='undefined') {
                total += element.package.price * diffDays;
                }
            });
            this.bookingrequest.roomTypes.forEach(element => {
                if (typeof element.optionService !='undefined') {
                    total += element.optionService.price;
                }
            });
            return this.bookingrequest.total.totalPrice = total;
        },
        totalTime: function () {
            var a = moment(this.bookingrequest.time.checkin, 'D-M-YYYY');
            var b = moment(this.bookingrequest.time.checkout, 'D-M-YYYY');
            var diffDays = b.diff(a, 'days');
            return this.bookingrequest.total.totalNight= diffDays;
        },
        totalRoom: function () {
           return this.bookingrequest.total.totalRoom= this.bookingrequest.roomTypes.length;
        },
        totalGolfer:function(){
            var total = 0;
            if (this.bookingrequest.roomTypes.length>0) {
            this.bookingrequest.roomTypes.forEach(element => {
                total += element.guest.golfer.qty;
            });
        }
            return this.bookingrequest.total.totalGuest.totalGolfer= total;
        },
        totalNonGolfer:function(){
            var total = 0;
            if (this.bookingrequest.roomTypes.length>0) {
            this.bookingrequest.roomTypes.forEach(element => {
                total += element.guest.nongolfer.qty;
            });
        }
            return this.bookingrequest.total.totalGuest.totalNonGolfer= total;
        },
        totalAdult:function(){
            var total = 0;
            if (this.bookingrequest.roomTypes.length>0) {
            this.bookingrequest.roomTypes.forEach(element => {
                total += element.guest.adult.qty;
            });
        }
            return this.bookingrequest.total.totalGuest.totalAdult= total;
        },
        totalChildren:function(){
            var total = 0;
            if (this.bookingrequest.roomTypes.length>0) {
            this.bookingrequest.roomTypes.forEach(element => {
                total += element.guest.children.less4.qty + element.guest.children.less12.qty;
            });
        }
            return this.bookingrequest.total.totalGuest.totalChildren=total;
        }
    }
})




$('.starttime').datetimepicker({
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
    },
    format: 'DD-MM-YYYY',
    widgetPositioning: {
        horizontal: 'auto',
        vertical: 'bottom'
    },
    minDate: moment(),
    defaultDate: moment()
});
$('.endtime').datetimepicker({
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
    }, format: 'DD-MM-YYYY',
    widgetPositioning: {
        horizontal: 'auto',
        vertical: 'bottom'
    },
    defaultDate: moment(new Date()).add(1, 'days')
});
$(".starttime").on("dp.change", function (e) {
    $('.endtime').data("DateTimePicker").minDate(e.date);
});  