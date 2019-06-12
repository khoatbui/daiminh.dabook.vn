//http://103.237.144.222:3000
const apiUrl = 'http://localhost:3001';

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
            supplier: {},
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
            adult: {
                golfer:{"qty":0},
                nongolfer:{"qty":0},
                adult:{"qty":0},
                children: {"qty":0},
            },
            orderCode: "",
            totalPrice: 20000,
            time: {
                checkin: "",
                checkout: ""
            }
        },
        selection:{
            hotels: [],
            packages: [],
            roomTypes: [],
            optionServices: [],
            roomTypeSelect:[],
            adult: {
                golfer:{"qty":0},
                nongolfer:{"qty":0},
                adult:{"qty":0},
                children: {"qty":0},
            }
        },
        bank: {
            banks: [],
            selectedBank: {}
        },
    },
    created() {
        this.initialize();
        this.getHotelList('VIN');
    },
    methods: {
        initialize() {
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
        getHotelList(sup) {
            AXIOS.get(apiUrl + '/hotel/combobox/hotelbysuppliercode/'+sup, { crossdomain: true })
                .then((response) => {
                    this.selection.hotels = response.data;
                    this.bookingrequest.hotel=response.data[0];
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
                    this.selection.roomTypes=[];
                    response.data.forEach(element => {
                        this.selection.roomTypes.push({"roomType":element,qty:0})
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
            var reqBody={
                roomTypeId:this.bookingrequest.roomTypes,
                hotelId:  this.bookingrequest.hotel._id
            };
            AXIOS.post(apiUrl + `/packagehotelrel/combobox/packagebymultihotelroomtype`,reqBody)
            .then(response => {
                this.selection.packages=[];
                    response.data.forEach(element => {
                        this.selection.packages.push({"package":element,qty:0})
                    });
                    console.log( this.selection.packages);
            })
            .catch(function (error) {
            })
            .finally(function () { });
        },
        changePackageCombobox(package) {
            this.bookingrequest.packageId = package.packageId._id;
            this.bookingrequest.packageName = package.packageId.packageName;
            this.bookingrequest.packageCode = package.packageId.packageCode;
            this.bookingrequest.price = package.price;
            console.log(this.bookingrequest);
        },
        searchHotel() {
            this.bookingstep.find = true;
            this.bookingstep.confirm = true;
            if (this.bookingrequest.supplier == 'FLC') {
                this.bookingrequest.checkin = document.getElementById('flccheckin').value;
                this.bookingrequest.checkout = document.getElementById('flccheckout').value;
            }
            else {
                this.bookingrequest.checkin = document.getElementById('vincheckin').value;
                this.bookingrequest.checkout = document.getElementById('vincheckout').value;
            }
            AXIOS.post(apiUrl + "/packagehotelrel/price", this.bookingrequest)
                .then(response => {
                    this.bookingrequest.price = response.data[0].price;
                })
                .catch(function (error) {
                })
                .finally(function () { });
        },
        reserveHotel() {
            if (this.bookingrequest.name.length === 0) {
                this.formCheck = {
                    name: "text-rose",
                    email: "",
                    phone: "",
                    isFail: false
                }
            }
            else if (this.bookingrequest.email.length === 0) {
                this.formCheck = {
                    name: "",
                    email: "text-rose",
                    phone: "",
                    isFail: false
                }
            }
            else if (this.bookingrequest.phone.length === 0) {
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
                        this.orderCode = response.data;

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
        plusPerson(item) {
            item.qty++;
        },
        minusPerson(item) {
            item.qty--;
        },
        savePerson(){
            this.bookingrequest.adult=JSON.parse(JSON.stringify(this.selection.adult));
            
        },
        closePerson(){
           
            this.selection.adult= JSON.parse(JSON.stringify(this.bookingrequest.adult));
        },
        plusRoomType(item) {
           item.qty++;
            console.log( this.selection.roomTypes);
        },
        minusRoomType(item) {
            item.qty--;
            console.log( this.selection.roomTypes);
        },
        saveRoomType(){
            this.selection.roomTypes.forEach(element => {
                if (element.qty>0) {
                    this.bookingrequest.roomTypes.push(JSON.parse(JSON.stringify(element)))
                }
            });
            this.getPackageByMultiHotel();
        },
        closeRoomType(){
            this.bookingrequest.roomTypes.forEach(element => {
                if (element.qty>0) {
                    this.selection.roomTypes.find(obj => {
                        return obj.roomType.roomCode === element.roomType.roomCode
                      }).qty=JSON.parse(JSON.stringify(element.qty));
                }
            });
        }
    },
    computed: {
        // a computed getter
        totalPrice: function () {
            // `this` points to the vm instance
            var a = moment(this.bookingrequest.checkin, 'D-M-YYYY');
            var b = moment(this.bookingrequest.checkout, 'D-M-YYYY');
            var diffDays = b.diff(a, 'days');
            return this.bookingrequest.price * diffDays * this.bookingrequest.roomQty;
        },
        totalPriceFLC: function () {
            // `this` points to the vm instance
            var a = moment(this.bookingrequest.checkin, 'D-M-YYYY');
            var b = moment(this.bookingrequest.checkout, 'D-M-YYYY');
            var diffDays = b.diff(a, 'days');
            return this.bookingrequest.price * diffDays * this.bookingrequest.roomQty;
        },
        totalTime: function () {
            var a = moment(this.bookingrequest.checkin, 'D-M-YYYY');
            var b = moment(this.bookingrequest.checkout, 'D-M-YYYY');
            var diffDays = b.diff(a, 'days');
            return diffDays;
        },
        getPackageNote: function () {
            var package = this.vinPackage.filter(obj => { return obj._id === this.bookingrequest.packageId })
            return package.note;
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
    minDate: moment()
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
    }
});
$(".starttime").on("dp.change", function (e) {
    $('.endtime').data("DateTimePicker").minDate(e.date);
});  