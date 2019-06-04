// Define a new component called button-counter
Vue.component('header-component', {
    data: function () {
      return {
        searchbox: ""
      }
    },
    template: `<nav class="navbar navbar-color-on-scroll navbar-transparent fixed-top navbar-expand-lg" color-on-scroll="100">
    <div class="container">
        <div class="navbar-translate"> <a class="navbar-brand" href="../index.html"> <img src="../img/new_logo.jpg"
                    alt="" height="50px;"> </a> <button class="navbar-toggler" type="button" data-toggle="collapse"
                aria-expanded="false" aria-label="Toggle navigation"> <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span> <span class="navbar-toggler-icon"></span> <span
                    class="navbar-toggler-icon"></span> </button> </div>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item"> <a href="../index.html" class="nav-link"> <i class="fa fa-menu"></i> Home
                    </a> </li>
                <li class="nav-item"> <a href="../tour/destination.html" class="nav-link"> <i
                            class="fa fa-menu"></i>
                        Destination
                    </a> </li>
                <li class="nav-item"> <a href="../tour/travelstyle.html" class="nav-link"> <i
                            class="fa fa-menu"></i>
                        Travel Style
                    </a> </li>
                <li class="nav-item"> <a href="../tour/travelservice.html" class="nav-link"> <i
                            class="fa fa-menu"></i>
                        Travel Service
                    </a> </li>
                <li class="nav-item"> <a href="../tour/mice.html" class="nav-link"> <i class="fa fa-menu"></i> MICE
                    </a> </li>
                <li class="nav-item"> <a href="../tour/fit.html" class="nav-link"> <i class="fa fa-menu"></i> FIT
                    </a> </li>
                <li class="nav-item"> <a href="../function/aboutus.html" class="nav-link"> <i
                            class="fa fa-menu"></i>
                        About Us
                    </a> </li>
                <li class="nav-item ">
                    <ul class="navbar-nav">
                        <li class="active"> <a href="#" class="nav-link"> <img class="language-icon"
                                    src="../img/language/vietnam.png" alt=""> | VI
                            </a>
                        </li>
                        <li class="hide"> <a href="#" class="nav-link"> <img class="language-icon"
                                    src="../img/language/united-kingdom.png" alt=""> | EN
                            </a>
                        </li>
                        <li class="hide"> <a href="#" class="nav-link"> <img class="language-icon"
                                    src="../img/language/south-korea.png" alt=""> | KO
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item d-inline-block d-sm-inline-block d-md-none d-lg-none d-xl-none">
                    <ul
                        class="navbar-nav footer-social d-flex flex-row justify-content-around align-items-center p-4">
                        <li><a href="#"><img src="../img/social/kakao.png" alt=""></a></li>
                        <li><a href="#"><img src="../img/social/facebook.png" alt=""></a></li>
                        <li><a href="#"><img src="../img/social/skype.png" alt=""></a></li>
                        <li><a href="#"><img src="../img/social/twitter.png" alt=""></a></li>
                        <li><a href="#"><img src="../img/social/zalo.png" alt=""></a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>`,
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
