// Define a new component called button-counter
Vue.component('index-footer-component', {
    data: function () {
        return {
        }
    },
    template: `
    <div class="p-0 m-0">
    <footer class="footer footer-default text-left">
    <div class="container">
        <div class="row mb-2">
            <div class="col-lg-3 col-md-6 col-sm-12 text-left">
                <div class="row pt-2">
                    <div class="col-6">
                        <img class="footer-logo" src="img/new_logo.jpg" alt=""></div>
                    <div class="col-6">
                        <img class="footer-logo" src="img/logo dabook.png" alt="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group bmd-form-group mb-0"> <label class="bmd-label-floating">Your name
                                *</label>
                            <input type="text" class="form-control" aria-label="Username"> </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group bmd-form-group mb-0"> <label class="bmd-label-floating">Email
                                *</label>
                            <input type="text" class="form-control" aria-label="Username"> </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group bmd-form-group mb-0"> <label class="bmd-label-floating">Phone</label>
                            <input type="text" class="form-control" aria-label="Username"> </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group bmd-form-group mb-0"> <label class="bmd-label-floating">Give us
                                feedback</label>
                            <input type="text" class="form-control" aria-label="Username"> </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex text-center align-items-center justify-content-start">
                        <button class="btn btn-info btn-search-fly btn-sm"> <i
                                class="fas fa-plane-departure"></i>Send
                            us</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <h4>Contact</h4>
                <ul class="d-flex flex-column">
                    <li> <span> <i class="fas fa-map-marker-alt mr-2"></i>Lot 118, TT3, My Dinh 1, Nam Tu Liem,
                            Hanoi</span></li>
                            <li class="text-danger"> <span> <i class="fab fa-hotjar mr-2"></i> 19001542</span> </li>

                            <li> <span> <i class="fas fa-phone mr-2"></i>0243-562-3777/778</span> </li>
                            <li><span> <i class="fas fa-fax mr-2"></i>0243-562-3772 </span></li>
                            <li> <span> <i class="fas fa-envelope mr-2"></i> contact@daiminhtravel.com</span> </li>
                    <li>
                        <ul class="footer-social">
                            <li><a href="#"><img src="img/social/kakao.png" alt=""></a></li>
                            <li><a href="#"><img src="img/social/facebook.png" alt=""></a></li>
                            <li><a href="#"><img src="img/social/skype.png" alt=""></a></li>
                            <li><a href="#"><img src="img/social/twitter.png" alt=""></a></li>
                            <li><a href="#"><img src="img/social/zalo.png" alt=""></a></li>
                        </ul>
                    </li>
                </ul>
                <hr />
                <h4>Addition Infomation</h4>
                <ul class="d-flex flex-column">
                <li><a href="#"><b>Business Licience : </b><span class="text-rose"> 0101472382 </span></a></li>
                <li><a href="#"><b>International Tour Opertor Licience: </b><span class="text-rose"> 01-035/2015/TCDL-GPLHQT</span></a></li>
            </ul>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <h4>Our partner</h4>
                <div class="d-flex justify-content-start align-items-center flex-wrap">
                <div class="card m-1 w-30 flex-grow-1 p-1"><img class="card-img-top img-retange"
                src="img/partner/Vinpearl.jpg" alt="Card image cap" data-toggle="tooltip" data-placement="top" title="Vinpearl"></div>
                <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top img-retange"
                        src="img/partner/flc.png" alt="Card image cap" data-toggle="tooltip" data-placement="top" title="FLC"> </div>
                <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top img-retange"
                        src="img/partner/hera.jpg" alt="Card image cap" data-toggle="tooltip" data-placement="top" title="Hera Cruise"> </div>
                <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top img-retange"
                        src="img/partner/heritage.png" alt="Card image cap" data-toggle="tooltip" data-placement="top" title="Heritage Line"> </div>
                <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top img-retange"
                        src="img/partner/lotte.png" alt="Card image cap" data-toggle="tooltip" data-placement="top" title="Lotte"> </div>
                <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top img-retange"
                        src="img/partner/Paradise.jpg" alt="Card image cap" data-toggle="tooltip" data-placement="top" title="Paradise Cruise"> </div>
                <div class="card m-1 w-30 flex-grow-1 p-1"><img class="card-img-top img-retange"
                        src="img/partner/Sheraton.png" alt="Card image cap" data-toggle="tooltip" data-placement="top" title="Sheraton"></div>
                <!-- <div class=" m-1 w-30 flex-grow-1 p-1">&nbsp;</div> -->
                <!-- <div class="card m-1 w-30 flex-grow-1 p-1"><img class="card-img-top img-retange" src="img/doitac/image.png" alt="Card image cap"></div><div class="card m-1 w-30 flex-grow-1 p-1"><img class="card-img-top img-retange" src="img/doitac/sunworld.png" alt="Card image cap"></div><div class="card m-1 w-30 flex-grow-1 p-1"><img class="card-img-top img-retange" src="img/doitac/tripavisor.jpg" alt="Card image cap"></div> -->
            </div>
                <hr />
                <h4>Service</h4>
                <ul class="d-flex flex-column">
                    <li> <a href="service/travelservice.html">Travel</a> </li>
                    <li> <a href="service/visaservice.html">Visa</a> </li>
                    <li> <a href="service/lawandinvest.html">Legal & Investment Consultancy </a> </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <h4>Certificate</h4>
                <div class="d-flex flex-sm-row align-items-start flex-wrap">
                    <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top"
                            src="img/certificate/iata.jpg" alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top"
                            src="img/certificate/thongbao_bocongthuong.png" alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top"
                            src="img/certificate/dangki_bocongthuong.png" alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top"
                            src="img/certificate/DMCA.png" alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top"
                            src="img/certificate/Norton-Mobile-Security-Logo.jpg" alt="Card image cap">
                    </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1"> <img class="card-img-top"
                    src="img/certificate/tcdl.jpg" alt="Card image cap">
            </div>
                </div>
                <hr />
                <h4>Payment</h4>
                <div class="d-flex flex-sm-row align-items-start flex-wrap">
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('VISA')"> <img class="card-img-top" src="img/payment/visa.png"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('MASTERCARD')"> <img class="card-img-top" src="img/payment/mastercard.png"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('PAYPAL')"> <img class="card-img-top" src="img/payment/paypal.png"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('SHINHANBANK')"> <img class="card-img-top" src="img/payment/shinhanbank.jpg"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('TECHCOMBANK')"> <img class="card-img-top" src="img/payment/techcombank.png"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('VIETCOMBANK')"> <img class="card-img-top" src="img/payment/vietcombank.jpg"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('HDBANK')"> <img class="card-img-top" src="img/payment/hdbank.jpg"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('VIETINBANK')"> <img class="card-img-top" src="img/payment/vietinbank.png"
                            alt="Card image cap"> </div>
                    <div class="card m-1 w-30 flex-grow-1 p-1 cursor-pointer" data-toggle="modal"
                        data-target="#bankModal" @click="selectPayment('AGRIBANK')"> <img class="card-img-top" src="img/payment/agribank.jpg"
                            alt="Card image cap"> </div>
                </div>
            </div>
        </div>
        <div class="row border-top pt-2">
            <div class="col-12 col-md-6 text-center"> &copy;2019, made with
                <i class="far fa-heart"></i> by
                <a href="https://www.dabook.vn/" target="blank">DaiMinh</a> for a better travel. </div>
            <div class="col-12 col-md-6 text-center footer-policy">
                <ul>
                    <li>
                        <a href="function/legal.html">Privacy Policy |</a>
                    </li>
                    <li>
                        <a href="function/legal.html">Terms of Use |</a>
                    </li>
                    <li>
                        <a href="function/contact.html">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>

<div class="widget-component">
    <ul class="d-flex flex-column">
        <li class="special-margin">
            <a class="btn btn-info btn-fab btn-round" href="tel:19001542">
                <i class="fas fa-phone"></i>
            </a>
        </li>
    </ul>
</div>

<div class="modal fade" id="bankModal" tabindex="-1" role="dialog" aria-labelledby="bankModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom pb-3 text-left">
                <h6 class="modal-title" id="bankModalLabel"><span class="badge badge-success">{{selectedPayment.bankCode}}</span>THÔNG TIN TÀI KHOẢN CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ VÀ DU LỊCH ĐẠI MINH</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <p><b>Chủ tài khoản : </b>{{selectedPayment.bankOwner}}</p>
            <p><b>Số tài khoản : </b>{{selectedPayment.bankAccount}}</p>
            <p><b>Chi nhánh : </b>{{selectedPayment.bankLocation}}</p>
            </div>
            <div class="modal-footer">
            <input type="text" class="invisible" aria-label="Username" id="ihidden-input" v-model="selectedPayment.bankAccount">
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary btn-sm btn-info" @click="bankCopy">Bank copy</button>
            </div>
        </div>
    </div>
</div>
</div>`,
    created() {
        this.initialize();
    },
    methods: {
        initialize() {
            AXIOS.get(apiUrl + '/payments', { crossdomain: true })
                .then((response) => {
                    this.payments = response.data;
                    this.selectedPayment = this.payments[0];
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        },
        selectPayment(name) {
            document.getElementById('bank-account').classList.remove("text-rose");
            this.selectedPayment = this.payments.find(x => x.bankCode.toUpperCase() === name.toUpperCase())
        },
        bankCopy(){
            document.getElementById('bank-account').classList.add("text-rose");
            var copyText = document.getElementById("ihidden-input");
            copyText.select();
            console.log(copyText.value);
            document.execCommand("copy");
                    }
    }
})
