// footer
Vue.component('my-footer', {
    template: `
        <footer class="text-center">
            <p>本站網路投保服務，由『凱萊保險代理人股份有限公司』提供 </p>
            <p>本站產險商品，由『泰安產物保險公司』提供 </p>
            <p><a href="#" @click="principleAnnounce">使用條款</a> | <a href="#" @click="privateAnnouce">隱私政策</a></p>
            <div class="footer-bottom">
                <span>© 2017 Careline. All Rights Reserved.</span>
            </div>
        </footer>
    `,
    data: function () {
       return {
           
       }
    },
    methods: {
        principleAnnounce: function () {
            $('#myModal').modal('show');
            this.$parent.$data.pdfContentToShow = true;
        },
        privateAnnouce: function () {
            $('#myModal').modal('show');
            this.$parent.$data.pdfContentToShow = true;
        }
    }
})

// products
Vue.component('my-products', {
    template:
            ` 
              <section class="productSection animated" v-bind:class="{zoomInLeft: isActive, zoomInRight: !isActive,}">
                  <div class="row">
                        <div class="col-sm-12 text-center">
                            <h4>選擇您的車牌顏色</h4>
                        </div>
                    </div>  
                  <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="products col-md-3 text-center" v-for="(product, key) in products">
                                <div class="productContentDiv animated" @click="productClicked(product, key)">
                                    <div class="plateColor" :style="{ background: product.color, width: '96%', height: '90px', color: product.textColor }"><span>{{ product.cc }}</span></div>
                                    <div class="cardPlateImg" ></div>
                                    <div class="productContent">
                                    <div class="title"><div class="yearTitle"><p>{{ product.year }}年</p></div><span>{{ product.title }}</span></div>
                                    <div class="priceDiv">
                                    <p class="priceNormal">{{ product.price }}<p/>
                                    <p class="priceDiscount">{{ product.discountPrice }}<p/>  
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 buttonProject">
                            <div class="col-sm-6 text-center">
                                <button class="btn btn-lg" @click="twoYearProduct">兩年方案</button>
                            </div>
                            <div class="col-sm-6 text-center">
                                <button class="btn btn-lg" @click="oneYearProduct">一年方案</button>
                            </div>
                        </div>
                    </div>
                  </div>
              </section>
            `,
    data: function () {
       return {
           selectedProduct: {},
           isActive: false,
           products: [
               { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content:   ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'green', cc: '1-50cc', textColor: 'white'},
               { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content:   ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'white', cc: '51-250cc', textColor: 'black'},
               { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content: ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'yellow', cc: '250-550cc', textColor: 'black'},
               { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content:   ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'red', cc:'550cc+', textColor: 'white' }

           ]
       }
    },
    methods: {
        oneYearProduct: function(event) {
            this.isActive = false;
            this.products = [
                { title: '機車強制險', year: 1, price: 1390, discountPrice: '', content: ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'green', cc: '1-50cc', textColor: 'white' },
                { title: '機車強制險', year: 1, price: 1390, discountPrice: '', content: ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'white', cc: '51-250cc', textColor: 'black' },
                { title: '機車強制險', year: 1, price: 1390, discountPrice: '', content:   ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'yellow', cc: '250-550cc', textColor: 'black'},
                { title: '機車強制險', year: 1, price: 1390, discountPrice: '', content: ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'red',  cc:'550cc+', textColor: 'white' },
            ]
        },
        twoYearProduct: function(event) {
            this.isActive = true;
            this.products = [
                { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content:   ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'green', cc: '1-50cc', textColor: 'white'},
                { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content:   ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'white', cc: '51-250cc', textColor: 'black' },
                { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content: ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'yellow', cc: '250-550cc', textColor: 'black' },
                { title: '機車強制險', year: 2, price: 1306, discountPrice: 1422, content:   ['每一人體傷20萬元', '每一人死殘200萬元'], color: 'red', cc:'550cc+', textColor: 'white'},
            ]
        },
        productClicked: function(product, index) {
            localStorage.setItem('productCC', index);
            localStorage.setItem('productYear', product.year);
            localStorage.setItem('secondPageNav', true);

            this.selectedProduct['title'] = product.title;
            this.selectedProduct['year'] = product.year;
            this.selectedProduct['price'] = product.price;
            this.selectedProduct['discountPrice'] = product.discountPrice;
            this.selectedProduct['content'] = product.content;
            localStorage.setItem('userSelectedProduct', JSON.stringify(this.selectedProduct));
            window.location.href = './formOne.html'
        }
    }
})

// carousel
Vue.component('my-carousel', {
    template: `
     <div id="myCarousel" class="carousel slide" data-ride="carousel">
      
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img class="first-slide" src="images/banner.jpg" alt="First slide">
          <div class="container">
            <div class="carousel-caption">
            </div>
          </div>
        </div>
       
      </div>
    </div>
    `
})

// Nav-Bar
Vue.component('my-nav', {
    template: `
               <nav class="navbar navbar-default">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <div class="logo"><a href="#" @click="toGoBackIndex">logo</a></div>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                  </div>
                  <div id="navbar" class="navbar-collapse collapse" v-bind:class="{secondPageNav: alterChangeNav}">
                    <ul class="nav navbar-nav navbar-right">
                      <li><a href="#" @click="toGoQandAPage">Q&A <span class="sr-only">(current)</span></a></li>
                      <li><a href="#"><i class="fa fa-facebook-square" aria-hidden="true"></i></a></li>
                      <li><a href="#"><i class="fa fa-phone" aria-hidden="true"></i>免費客服專線 0800-234-088</a></li>
                    </ul>
                  </div><!--/.nav-collapse -->
                </div><!--/.container-fluid -->
              </nav>
              `,
    methods: {
        toGoBackIndex : function () {
            window.location.href = './index.html';
        },
        toGoQandAPage : function () {
            window.location.href = './qanda.html';
        }
    },
    computed: {
        alterChangeNav: function () {
            return localStorage.getItem('secondPageNav');
        }
    }
})

var vm = new Vue({
    el: '#app',
    data: {
        isAplicantValidateWellorNot: false,
        readyToGoThanksPage: false,
        readyToConfirmInfo: false,
        isCompleted: false,
        readyToGoPay: false,
        pdfContentToShow: false,
        isMH: false,
        processbarNu: 25,
        userSelectedProduct: {},
        applicantData: {},
        insuredData: {},
        motocycleInfo: {},
        RelatedList: [],
        AcityList: [{id: 0, name: '都市'}],
        AdistrictList: [{id: 0, name: '區'}],
        IcityList: [{id: 0, name: '都市'}],
        IdistrictList: [{id: 0, name: '區'}],
        BrandList: [],
        productCC: '',
        dataId: '',
        userEnteredProdcutCC: '',
        motoSpeedPosition: {
            left: 230
        },
        message: 'Hello Vue.js!'
    },
    methods: {
        
    },
    computed: {
        steps : function () {
            return [{ text: '選擇專案', stepComplete: true },{ text: '填寫資料', stepComplete: this.isCompleted  },{ text: '確認付款', stepComplete: this.readyToGoPay  },{ text: '要保完成', stepComplete: this.readyToGoThanksPage  }];
        }
    },
    mounted: function() {
       
    }
})
