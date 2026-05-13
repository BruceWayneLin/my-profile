// my-modal
Vue.component('my-modal', {
    template: `
        <div class="container">
            <!-- Modal -->
            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog" v-bind:class="{'pdfShow': pdfContentToShow}">

                    <!-- Modal content-->
                    <div class="modal-content"  v-bind:class="{'showPDFContent': pdfContentToShow}">
                        <div class="modal-header text-center">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">CareLine</h4>
                        </div>
                        <div class="modal-body">
                            <div class="content-modal text-center" v-bind:class="{'showPDFContent': pdfContentToShow}">
                                <p v-show="!pdfContentToShow">{{ textProductCCWarning }} <div style="color:green; display:inline-block;" v-show="greenPlate">{{greenText}}</div> <div style="display:inline-block;" v-show="whitePlate">{{whiteText}}</div> <div style="color:#b3b301;display:inline-block;" v-show="yellowPlate">{{yellowText}}</div> <div style="color:red;display:inline-block;" v-show="redPlate">{{redText}}</div></p>
                                 <object v-show="pdfContentToShow" style="width:100%" data="pdf/industryContentPrinciple.pdf" type="application/pdf" width="100%" height="100%">
                                    <iframe src="pdf/industryContentPrinciple.pdf#view=fit" type="application/pdf" />
                                 </object>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div v-show="pdfContentToShow">
                                <button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
                            </div>    
                            <div v-show="!pdfContentToShow" class="text-center">
                                <a :href="'./index.html'"><button type="button" class="btn btn-primary">{{btnTextOne}}</button></a>
                                <button type="button" class="btn btn-primary" data-dismiss="modal">{{btnTextTwo}}</button>
                            </div>    
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `,
    data : function () {
        return {
            greenPlate: false,
            whitePlate: false, 
            yellowPlate: false,
            redPlate: false,
            greenText: '',
            whiteText: '',
            yellowText: '',
            redText: '',
            redPlate: '',
            btnTextOne: '',
            btnTextTwo: '',
        }
    },
    computed: {
        pdfContentToShow: function () {
            return this.$parent.$data.pdfContentToShow;
        },
        textProductCCWarning: function () {
            if(this.$parent.userEnteredProdcutCC){
                switch(localStorage.getItem('productCC')){
                    case '0':
                    this.greenPlate = true;
                    break;
                    case '1':
                    this.whitePlate = true;
                    break;
                    case '2':
                    this.yellowPlate = true;
                    break;
                    case '3':
                    this.redPlate = true;
                    break;
                    default: 
                }
                var enteredCC = this.$parent.userEnteredProdcutCC;
                if(this.$parent.isMH == true ){
                    this.greenText = '綠牌(HP <= 5)';
                    this.whiteText = '白牌(5 < HP <= 40)';
                    this.yellowText = '紅黃牌(HP > 40)';
                    this.redText = '紅黃牌(HP > 40)';
                    this.btnTextOne = '重選車牌方案';
                    this.btnTextTwo = '重新輸入馬力數';
                }else{
                    this.greenText = '綠牌(1-50cc)';
                    this.whiteText = '白牌(51-250cc)';
                    this.yellowText = '黃牌(251-550)';
                    this.redText = '紅牌(551cc+)';
                    this.btnTextOne = '重選車牌方案';
                    this.btnTextTwo = '重新輸入排氣量';
                }
            return '您輸入的'+ (this.$parent.isMH == true ? '馬力數' : '排氣量') + '(' + enteredCC + ')與您挑選的車牌方案' + (this.$parent.isMH == true ? '馬力數' : '排氣量') + '不符，提醒您，您剛剛所選擇的車牌方案是';
            }else{
                this.btnTextOne = '重選車牌方案';
                this.btnTextTwo = '重新輸入排氣量';
                return '您未輸入行照排氣量。請回表單填入排氣量，謝謝。';
            }
        }
    }
})

Vue.component('thankspage', {
    template: `
        <div class="contaienr thanksPage animated" style="margin-top:60px;">
            <div class="row">
                <div class="col-sm-12">
                    <div class="imgThanksPage">
                        <img src="holder.js/100px250" class="img-rounded img-fluid" alt="Responsive image" style="">
                    </div>
                </div>
                <div class="col-sm-12 thanksDiv">
                    <div class="col-sm-12 text-center">
                        <h2><i class="fa fa-check-circle" aria-hidden="true"></i>感謝您已完成機車保險訂單</h2>
                    </div>
                    <div class="col-sm-12">
                        <div class="thanksWords text-center">
                            <h3>訂購完成！相關資訊將會寄送到您的E-mail信箱</h3>
                            <p>訂單編號: 0011-00016256</p>
                            <p>若有任何疑問，請撥打免費客服專線: <i aria-hidden="true" class="fa fa-phone"></i> 0800-234-088 </p>
                            <button class="pull-right btn btn-primary" @click="goBackToIndex">完成</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {

        }
    },
    methods: {
      goBackToIndex: function() {
          window.location.href = './index.html'
      }
    },
    computed: {
        toThanks: function() {
            return this.$parent.readyToGoThanksPage;
        }
    }
})

Vue.component('my-paymentcredit', {
    template: `
        <div class="container animated" :show="readyToPay" v-bind:class="{slideInLeft: readyToPay, slideOutLeft: !readyToPay}">
            <div class="row">
                <div class="col-sm-12">
                    <div class="paymentCreditCardArea text-center">
                        <h3 style="padding-top: 150px;">我是信用卡付錢刷卡頁，謝謝</h3>
                    </div>
                </div>
            </div>
            <div class="row buttonPaymentPage">
                <div class="col-sm-12 text-right">
                    <button class="btn btn-primary NextButton" @click="toGoThanksPage">下一步</button>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {

        }
    },
    methods: {
        toGoThanksPage: function() {
            this.$parent.readyToGoThanksPage = true;
            this.$parent.processbarNu = 100;
        }
    },
    computed: {
        readyToPay: function() {
            if(this.$parent.readyToGoThanksPage){
                return false;
            }else{
                return this.$parent.readyToGoPay;
            }
        }
    }

})

Vue.component('my-infocheck', {
    template: `
        <div class="container customerInfo animated" v-show="readyToConfirm" v-bind:class="{slideInLeft: readyToConfirm, slideOutLeft: !readyToConfirm}">
            <div class="container-fluid">
                <div class="row title">
                    <div class="col-sm-12 text-center">
                        <h3>投保資料確認</h3>
                    </div>
                </div>

                
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <h4>要保人資料</h4>
                        </div>
                        <div class="col-sm-6">
                            <h4>被保人資料({{ insuredPP.withInsuredRelationShipItemText }})</h4>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>姓名:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{applicant.applicantLastName}} {{ applicant.applicantFirstName }}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>姓名:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ insuredPP.insuredLastName }} {{ insuredPP.insuredFirstName }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>身分證字號:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ applicant.applicantPid }}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>身分證字號:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ insuredPP.insuredPid }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>性別:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ applicant.applicantGender == 'male' ? '男' : '女' }}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>性別:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ insuredPP.insuredGender == 'male' ? '男' : '女' }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>出生日期:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ applicant.applicantBirthday }}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>出生日期:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ insuredPP.insuredBirthdayForCheck }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>手機號碼:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ applicant.applicantMobile }}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>手機號碼:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ insuredPP.insuredMobile }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>地址:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ applicant.applicantAddr }}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>地址:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ insuredPP.insuredAddr }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>E-Mail信箱:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ applicant.applicantEmail }}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3">
                                <p>E-Mail信箱:</p>
                            </div>
                            <div class="col-sm-9 text-left">
                                <p>{{ insuredPP.insuredEmail }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid" style="margin-top: 0px;">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-12">
                            <h4>機車資料</h4>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3"><p>車牌:</p></div>
                            <div class="col-sm-9 text-left"><p>{{motoInfo.plateEng}} - {{motoInfo.plateNum}}</p></div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3"><p>發照日期:</p></div>
                            <div class="col-sm-9 text-left"><p>{{motoInfo.motoReleasePlateDateForCheck}}</p></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3"><p>車子品牌:</p></div>
                            <div class="col-sm-9 text-left"><p>{{motoInfo.motocycleFactory}}</p></div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3"><p>出廠日期:</p></div>
                            <div class="col-sm-9 text-left"><p>{{motoInfo.motoFactoryDateForCheck}}</p></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <div class="col-sm-3"><p>排氣量:</p></div>
                            <div class="col-sm-9 text-left"><p>{{ userEnteredProdcutCC }}</p></div>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-3"><p>引擊/車身號碼:</p></div>
                            <div class="col-sm-9 text-left"><p>{{motoInfo.engineNumber}}</p></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid" style="margin-top:0px;">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="col-sm-12">
                            <h4>保單資料</h4>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="col-sm-4">
                            <p>保險種類</p>
                        </div>
                        <div class="col-sm-4">
                            <p>保險金額</p>
                        </div>
                        <div class="col-sm-4">
                            <p>強制險生效日</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="col-sm-4">
                            <p>{{ productInfo.prodInfo['title']  }}</p>
                            <a href="#">保險相關條款</a>
                        </div>
                        <div class="col-sm-4">
                            <p v-for="item in productInfo.prodInfo['content'] ">{{ item }}</p>
                        </div>
                        <div class="col-sm-4">
                            <p>{{motoInfo.executionDay}}</p>
                            <p>中午12點起保({{ productInfo.prodInfo['year'] }}年期)</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="col-sm-6">
                            <strong>總保費</strong>
                        </div>
                        <div class="col-sm-6 text-right">
                            <strong>{{ productInfo.prodInfo['price'] }}(元)</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid" style="margin-top: 0px;">
                <div class="row">
                    <div class="col-sm-12 text-right">
                        <button class="btn btn-danger NextButton" @click="toSlideOut" >上一步</button>
                        <button class="btn btn-primary NextButton" @click="toGoOnNextPay" >下一步</button>
                    </div>
                </div>
             </div>
        </div>   
    `,
    data: function () {
        return {

        }
    },
    methods: {
        toSlideOut: function() {
            this.$parent.readyToConfirmInfo = false;
        },
        toGoOnNextPay: function() {
            //this.$parent.readyToGoPay = true;
            var dataIdx = localStorage.getItem('dataId');
            var dataUrl = encodeURIComponent( dataIdx );
            window.location.href = '/motorbike-mbr/payment/goToPaymentPage?dataId=' + dataUrl;
            this.$parent.processbarNu = 75;
        }
    },
    computed: {
        readyToConfirm: function () {
            if(this.$parent.readyToGoPay){
                return false;
            }else{
                return this.$parent.readyToConfirmInfo;
            }
        },
        applicant: function () {
            return this.$parent.applicantData;
        },
        insuredPP: function () {
            return this.$parent.insuredData;
            console.log(this.$parent.insuredData);
        },
        motoInfo: function () {
            return this.$parent.motocycleInfo;
        },
        productInfo: function () {
            var returnVal = {}
            returnVal['prodInfo'] = JSON.parse(localStorage.getItem('userSelectedProduct'));
            return returnVal;
        },
        userEnteredProdcutCC: function() {
            var isMH = this.$parent.isMH;
            var text = this.$parent.userEnteredProdcutCC + (isMH == true ? 'hp' : 'cc');
            return text;
        }
    },

})

Vue.component('my-motoform', {
    template: `
        <div class="container customerForm animated" v-show="toBeShown" v-bind:class="{ slideOutLeft: !toBeShown, slideInLeft: toBeShown}">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                        <strong>車籍資料</strong>
                    </div>
                    <div class="col-sm-7"></div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                        <div class="exampleCarLicense" v-for="( value, index ) in showExamples" :class="'licenseExample' + (index + 1)" v-show="value.isShow"></div>       
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-12">
                           <span style="position: relative;top: 10px;">選擇車廠:</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-6">
                           <button class="form-control kymcoIcon" type="radio"  name="getMotoFactory"  v-bind:class="{errorShow:motoMadeFactoryInValid, buttonActive:MCButton}" @click="getMotoFactory('MC')">光陽/KYMCO</button>
                        </div>
                        <div class="col-sm-6">
                           <button class="form-control symlogo" type="radio" name="getMotoFactory" v-bind:class="{errorShow:motoMadeFactoryInValid, buttonActive:MAButton}" @click="getMotoFactory('MA')">三陽/SYM</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-6">
                            <button style="margin-bottom:0px;" type="radio" name="getMotoFactory" class="form-control yamahaIcon" v-bind:class="{errorShow:motoMadeFactoryInValid, buttonActive:MBButton}" @click="getMotoFactory('MB')">山葉/YAMAHA</button>
                            <span  class="errorMessage" v-show="motoMadeFactoryInValid">{{ motoMadeFactoryErrorMsg }}</span>
                        </div>
                        <div class="col-sm-6">
                            <button class="form-control" type="radio" v-bind:class="{errorShow:motoMadeFactoryInValid, buttonActive:OtherButton}" @click="getMotoFactory('other')">其他廠牌</button>
                            <div class="iconErrorMessageBack" style="right:-25px;" v-show="motoMadeFactoryInValid"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12" v-show="showOther">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-12">
                            <select @change="checkHpOrCc" v-model="motoMadeFactoryItem" v-bind:class="{errorShow:motoMadeFactoryInValid}" class="form-control">
                                <option v-for="item in brandList" :value="item">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-3">
                            <input type="text" v-bind:="tofocusSecondPlate" @click="validateMotoFac" v-bind:class="{errorShow:isPlateError}" style="text-transform:uppercase" maxlength="3" v-model="plateNumberFirstArea" :disabled="newPlate" placeholder="請輸入車牌" class="form-control" name="motoPlateEng">
                            <span  class="errorMessage" v-show="isPlateError">{{ isPlateErrorMsg }}</span>
                        </div>
                        <div class="col-sm-1">
                            <div class="carPlateLineText"></div>    
                        </div>
                        <div class="col-sm-4">
                            <input type="text" v-bind:class="{errorShow:isPlateError}" style="text-transform:uppercase" maxlength="4" v-model="plateNumberSecondArea" :disabled="newPlate || !plateNumberFirstArea" placeholder="" class="form-control" name="motoplateNum">
                        </div>
                        <div class="col-sm-4">
                            <button type="button" v-bind:class="{errorShow:isPlateError}" @click="isNewPlate" class="form-control">新牌無牌照</button>
                            <div class="iconErrorMessageBack" style="right:-25px;" v-show="isPlateError"></div>
                        </div>
                    </div>
                </div>    
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-12">
                            <input type="text" @click="showEngineNumbExampmles" @change="validateEngineNumb" v-model="engineNum" v-bind:class="{errorShow:engineNumInValid}" name="engineNum" class="form-control" placeholder="引擊號碼/車身號碼(擇一)">
                            <span  class="errorMessage" v-show="engineNumInValid">{{ engineNumErrorMsg }}</span>
                            <div class="iconErrorMessageBack" style="right:-25px;" v-show="engineNumInValid"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-2">
                            <div style="padding-top:15px;">
                                <span>排氣量</span>
                            </div>
                        </div>
                        <div class="col-sm-8">
                                <input class="form-control" maxlength="4" @click="toShowAirCCExample" v-bind:class="{errorShow:ProductCCInValid}" v-model="userEnteredProdcutCC" placeholder="請輸入行照上的排氣量">
                                <span class="ccSpan">{{ ccTextOrHp }}</span>
                                <div class="iconErrorMessageBack" style="right:-50px;" v-show="ProductCCInValid"></div>
                                <span  class="errorMessage" v-show="ProductCCInValid">請輸入行照上的排氣量。</span>
                        </div>
                        <div class="col-sm-2">
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                        
                    </div>
                    <div class="col-sm-7">
                         <div class="col-sm-2">
                            <div style="padding-top:15px;">
                                <span>發照日期</span>
                            </div>
                         </div>
                         <div class="col-sm-4">
                            <select @change="validateReleasePlateYear" @click="toShowIssuedDateExample" v-model="releasePlateYearDate" v-bind:class="{errorShow:releasePlateYearInValid}" class="form-control" name="releasePlateYearDate" id="releasePlateYearDate">
                                <option value="">民國年</option>
                                <option v-for=" year in taiwanYear ">民國{{ year }}年</option>
                            </select>
                            <span  class="errorMessage" v-show="releasePlateYearInValid || releasePLateMonthInValid || releasePlateDayInValid">{{ releasePlateYearErrorMsg }}{{ releasePLateMonthErrorMsg }}{{ releasePlateDayErrorMsg }} 請選擇發照日期。</span>
                        </div>
                        <div class="col-sm-3">
                            <select @change="validateReleasePlateMonth" @click="toShowIssuedDateExample" v-model="releasePLateMonthDate" class="form-control" v-bind:class="{errorShow: releasePLateMonthInValid}" :disabled="releasePlateYearDate == ''" name="releasePLateMonthDate" id="releasePLateMonthDate">
                                <option value="">月</option>
                                <option v-for=" month in taiwanMonth ">{{ month }}月</option>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <select @change="validateReleasePlateDay" @click="toShowIssuedDateExample" v-model="releasePlateDayDate" class="form-control" v-bind:class="{errorShow:releasePlateDayInValid}" :disabled="releasePLateMonthDate == ''" name="releasePlateDayDate" id="releasePlateDayDate">
                                <option value="">日</option>
                                <<option v-for=" day in thisMonthDays ">{{ day }}日</option>
                            </select>
                            <div class="iconErrorMessageBack" style="right:-25px;" v-show="releasePlateYearInValid || releasePLateMonthInValid || releasePlateDayInValid"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-2">
                            <div style="padding-top:15px;">
                                <span>出廠年月</span>
                            </div>
                         </div>
                        <div class="col-sm-4">
                            <select @click="toShowMotoDateExample" class="form-control" @change="validateMotoYear" v-bind:class="{errorShow:releaseMotoYearInValid}" v-model="releaseMotoYearDate" name="releaseMotoYearDate" id="releaseMotoYearDate">
                                <option value="">西元年</option>
                                <option v-for=" year in westernYear ">{{ year }}年</option>
                            </select>
                            <span class="errorMessage" v-show="releaseMotoYearInValid || releaseMotoMonthInValid">{{ releaseMotoYearErrorMsg }}{{ releaseMotoMonthErrorMsg }} 請選擇出廠年月。</span>
                        </div>
                        <div class="col-sm-3">
                            <select @click="toShowMotoDateExample" class="form-control" @change="validateMotoMonth" v-bind:class="{errorShow:releaseMotoMonthInValid}" :disabled="releaseMotoYearDate == ''" v-model="releaseMotoMonthDate" name="releaseMotoMonthDate" id="releaseMotoMonthDate">
                                <option value="">月</option>
                                <option v-for=" month in taiwanMonth ">{{ month }}月</option>
                            </select>
                            <div class="iconErrorMessageBack" style="right:-25px;" v-show="releaseMotoYearInValid || releaseMotoMonthInValid"></div>
                        </div>
                        <div class="col-sm-3">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-2">
                            <div style="padding-top:15px">
                                <span>強制生效日</span>
                            </div>
                        </div>
                        <div class="col-sm-10">
                            <div class='input-group date' id='datetimepicker'>
                                <input id="inputEx" data-date-end-date="0d" v-bind:class="{errorShow:executionDayInValid}" v-model="executionDay" @change="validateExecution" type='text' class="form-control"/>
                                <span class="input-group-addon" @change="validateExecution">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                            <span class="errorMessage" v-show="executionDayInValid">{{ executionDayErrorMsg }}</span>
                            <div class="iconErrorMessageBack" style="right:-25px;" v-show="executionDayInValid"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-12 text-right">
                            <p class="timePeriod">中午12點起保<b> {{ productYear }} 年期 </b></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <div class="col-sm-12">
                            <button class="btn btn-primary NextButton" @click="readyToCheckInfo">下一步</button>
                            <button class="btn btn-danger NextButton" @click="goBackToCustomer">上一步</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            MAButton:false, MBButton:false, MCButton:true, OtherButton:false,
            isButtonActive: false,
            carLicenseExample: true,
            engineNumExample: false,
            airProduceExample: false,
            issuedDayExample: false,
            motoFacDateExample: false,
            brandExample: false,
            showOther: false,
            ProductCCInValid: false,
            motoMadeFactoryInValid: false,
            topDisplay: '',
            motoMadeFactoryItem: {},
            motoMadeFactory: 'MC',
            motoMadeFactoryErrorMsg: '',
            isPlateErrorMsg: '',
            plateNumberFirstArea: '',
            plateNumberSecondArea: '',
            executionDay: '',
            ccTextOrHp: 'cc',
            newPlate: false,
            isPlateError: false,
            engineNumInValid: false,
            engineNumErrorMsg: '',
            userEnteredProdcutCC: '', 
            releasePlateYearDate: '',
            releasePlateYearInValid: false,
            releasePlateYearErrorMsg: '',
            releasePLateMonthDate: '',
            releasePLateMonthErrorMsg: '',
            releasePLateMonthInValid: false,
            releasePlateDayErrorMsg: '',
            releasePlateDayDate: '',
            releasePlateDayInValid: false,
            releaseMotoYearDate: '',
            releaseMotoYearInValid: false,
            releaseMotoMonthDate: '',
            releaseMotoMonthInValid: false,
            releaseMotoYearErrorMsg: '',
            releaseMotoMonthErrorMsg: '',
            engineNum: '',
            executionDayErrorMsg: '',
            executionDayInValid: false
        }
    },
    methods: {
        showEngineNumbExampmles: function() {
            this.engineNumExample = true;
            this.airProduceExample = false;
            this.issuedDayExample = false;
            this.motoFacDateExample = false;
            this.carLicenseExample = false;
            this.brandExample = false;
        },
        toShowAirCCExample: function() {
            this.engineNumExample = false;
            this.airProduceExample = true;
            this.issuedDayExample = false;
            this.motoFacDateExample = false;
            this.carLicenseExample = false;
            this.brandExample = false;
        },
        toShowIssuedDateExample: function() {
            this.engineNumExample = false;
            this.airProduceExample = false;
            this.issuedDayExample = true;
            this.motoFacDateExample = false;
            this.carLicenseExample = false;
            this.brandExample = false;
        },
        toShowMotoDateExample: function() {
            this.engineNumExample = false;
            this.airProduceExample = false;
            this.issuedDayExample = false;
            this.motoFacDateExample = true;
            this.carLicenseExample = false;
            this.brandExample = false;
        },
        toShowBrandExample: function() {
            this.brandExample = true;
        },
        isNewPlate: function() {
          if(!this.newPlate){
            this.plateNumberFirstArea = '';
            this.plateNumberSecondArea = '';
            this.newPlate = true;
          }else {
            this.newPlate = false;
          }
        },
        getMotoFactory: function(value) {
            //this.isButtonActive = !this.isButtonActive;

            this.engineNumExample = false;
            this.airProduceExample = false;
            this.issuedDayExample = false;
            this.motoFacDateExample = false;
            this.carLicenseExample = false;
            this.brandExample = true;
            if(value !== 'other'){
                switch(value){
                    case 'MA':
                    this.MAButton = !this.MAButton;
                    this.MBButton = false;
                    this.MCButton = false;
                    this.OtherButton = false;
                    break;
                    case 'MB':
                    this.MBButton = !this.MBButton;
                    this.MAButton = false;
                    this.MCButton = false;
                    this.OtherButton = false;
                    break;
                    case 'MC':
                    this.MCButton = !this.MCButton;
                    this.MBButton = false;
                    this.MAButton = false;
                    this.OtherButton = false;
                    default:
                }
                this.motoMadeFactory = value;
                this.showOther = false;
            }else {
                this.OtherButton = !this.OtherButton;
                this.MAButton = false;
                this.MBButton = false;
                this.MCButton = false;
                this.showOther = true;
            }
            this.$parent.motoSpeedPosition['left'] = 430;
            this.$parent.processbarNu = 40;
        },
        goBackToCustomer: function() {
            this.$parent.isCompleted = false;
            this.$parent.processbarNu = 25;
            return this.$parent.isCompleted;
        },
        validateMotoFac: function() {
            this.engineNumExample = false;
            this.airProduceExample = false;
            this.issuedDayExample = false;
            this.motoFacDateExample = false;
            this.carLicenseExample = true;
            this.brandExample = false;
            if(this.motoMadeFactory == ''){
                this.motoMadeFactoryErrorMsg = "找不到廠牌嗎？請選擇其他。";
                this.motoMadeFactoryInValid = true;
            }else{
            };
        },
        readyToCheckInfo: function() {
            this.toValidatePlate();
            this.validateMotoFac();
            this.comparePlateWithEnterCC();
            this.validateEngineNumb();
            this.validateReleasePlateYear();
            this.validateReleasePlateMonth();
            this.validateReleasePlateDay();
            this.validateMotoYear();
            this.validateMotoMonth();
            this.validateExecution();
            
            if(!this.comparePlateWithEnterCC()){
                this.toShowModal();
                this.$parent.userEnteredProdcutCC = this.userEnteredProdcutCC;
                this.ProductCCInValid = true;
                this.$parent.readyToConfirmInfo = false;
            }else{
                this.$parent.userEnteredProdcutCC = this.userEnteredProdcutCC;
                this.$parent.readyToConfirmInfo = true;
                this.$parent.processbarNu = 50;
                var motocycleInfo = {};
                motocycleInfo['productIDFromBackend'] = localStorage.getItem('dataId');
                motocycleInfo['motocycleFactory'] = this.motoMadeFactory;
                motocycleInfo['plateEng'] = this.plateNumberFirstArea;
                motocycleInfo['plateNum'] = this.plateNumberSecondArea;
                motocycleInfo['isNewPlate'] = this.newPlate;
                var rY = parseInt(this.releasePlateYearDate.slice(2, 4)) + 1911;
                var rM = parseInt(this.releasePLateMonthDate.slice(0, 1));
                var rD = parseInt(this.releasePlateDayDate.slice(0, 1));
                var mY = parseInt(this.releaseMotoYearDate.slice(0, 4));
                var mM = parseInt(this.releaseMotoMonthDate.slice(0, 1));

                motocycleInfo['releasePlateYear'] = rY;
                motocycleInfo['releasePlateMonth'] = rM;
                motocycleInfo['releasePlateDay'] = rD;
                motocycleInfo['motoReleasePlateDateForCheck'] = this.releasePlateYearDate + ',' + this.releasePLateMonthDate + ',' + this.releasePlateDayDate;
                motocycleInfo['motoFactoryDateForCheck'] = this.releaseMotoYearDate + ',' + this.releaseMotoMonthDate;
                motocycleInfo['motoFactoryMadeYear'] = mY;
                motocycleInfo['motoFactoryMadeMonth'] = mM;
                motocycleInfo['engineNumber'] = this.engineNum;
                motocycleInfo['executionDay'] = this.executionDay;
                motocycleInfo['motocycleCC'] = this.userEnteredProdcutCC;
                this.$parent.motocycleInfo = motocycleInfo;
                localStorage.setItem('motorInfo', JSON.stringify(motocycleInfo));
                var postObj = {};
                postObj['motocycleInfo'] = motocycleInfo;

                $.ajax({
                    url: '/motorbike-mbr/journey/saveMotorbikeInfo',
                    data: {data: JSON.stringify(postObj)},
                    type:"POST",
                    dataType: 'text',

                    success: function(msg){
                    },

                    error:function(xhr, ajaxOptions, thrownError){ 
                        alert(xhr.status); 
                        alert(thrownError); 
                    }
                });
            }
        },
        toShowModal: function() {
            $('#myModal').modal('show');
            this.$parent.$data.pdfContentToShow = false;
        },
        toValidatePlate: function() {
            if(this.plateNumberFirstArea == '' && this.plateNumberSecondArea == '' && this.newPlate == false){
                this.isPlateError = true;
                this.isPlateErrorMsg = '請輸入車牌號碼。';
            }else if((this.plateNumberFirstArea !== '' || this.plateNumberSecondArea !== '') && this.newPlate == true){
                this.isPlateError = false;
            }else{
                this.isPlateError = false;
            }
        },
        validateEngineNumb: function() {
            if(this.engineNum == '') {
                this.engineNumInValid = true;
                this.engineNumErrorMsg = '請輸入引擎/車身號碼。';
            }else{
                this.engineNumInValid = false;
            }
        },
        validateReleasePlateYear: function () {
            if(this.releasePlateYearDate == ''){
                this.releasePlateYearInValid = true;
                this.releasePlateYearErrorMsg = '';
            }else{
                this.releasePlateYearInValid = false;
            }
        },
        validateReleasePlateMonth: function () {
            if(this.releasePLateMonthDate == ''){
                this.releasePLateMonthInValid = true;
                this.releasePLateMonthErrorMsg = '';
            }else{
                this.releasePLateMonthInValid = false;
            }
        },
        validateReleasePlateDay: function () {
            if(this.releasePlateDayDate == ''){
                this.releasePlateDayInValid = true;
                this.releasePlateDayErrorMsg = '';
            }else{
                this.releasePlateDayInValid = false;
            }
        },
        validateMotoYear: function () {
            if(this.releaseMotoYearDate == ''){
                this.releaseMotoYearInValid = true;
                this.releaseMotoYearErrorMsg = '';
            }else{
                this.releaseMotoYearInValid = false;
            }
        },
        validateMotoMonth: function () {
            if(this.releaseMotoMonthDate == ''){
                this.releaseMotoMonthInValid = true;
                this.releaseMotoMonthErrorMsg = '';
            }else{
                this.releaseMotoMonthInValid = false;
            }
        },
        validateExecution: function () {
            this.executionDay = $("#datetimepicker").find("input").val();
            if(this.executionDay == ''){
                this.executionDayInValid = true;
                this.executionDayErrorMsg = '請選擇強制險生效日。';
            }else{
                this.executionDayInValid = false;
            }
        },
        comparePlateWithEnterCC: function () {
            var selectProductCC = localStorage.getItem('productCC');
            if(this.motoMadeFactoryItem.code == 'MH'){
                this.$parent.isMH = true;
                if(selectProductCC == '0'){
                    if(this.userEnteredProdcutCC <= 1.34){
                            return true;
                        }else{
                            return false;
                        }
                }else if (selectProductCC == '1'){
                    if(this.userEnteredProdcutCC > 1.34 && this.userEnteredProdcutCC <= 5 ){
                            return true;
                        }else{
                            return false;
                        }    
                }else if (selectProductCC == '2'){
                    if(this.userEnteredProdcutCC > 5 && this.userEnteredProdcutCC <= 40 ){
                            return true;
                        }else{
                            return false;
                        }    
                }else if (selectProductCC == '3'){
                    if(this.userEnteredProdcutCC > 40 ){
                            return true;
                        }else{
                            return false;
                        }    
                }else{
                        return false;
                }        
            }else{
                if(selectProductCC == '0'){
                    if(this.userEnteredProdcutCC <= 50){
                            return true;
                        }else{
                            return false;
                        }
                }else if (selectProductCC == '1'){
                    if(this.userEnteredProdcutCC > 50 && this.userEnteredProdcutCC <= 250 ){
                            return true;
                        }else{
                            return false;
                        }    
                }else if (selectProductCC == '2'){
                    if(this.userEnteredProdcutCC > 250 && this.userEnteredProdcutCC <= 550 ){
                            return true;
                        }else{
                            return false;
                        }    
                }else if (selectProductCC == '3'){
                    if(this.userEnteredProdcutCC > 550 ){
                            return true;
                        }else{
                            return false;
                        }    
                }else{
                        return false;
                }        
            }
        },
        checkHpOrCc: function() {
            this.motoMadeFactory = this.motoMadeFactoryItem.id;

            if(this.motoMadeFactoryItem.code == 'MH'){
                this.ccTextOrHp = 'hp';
            }
        }

    },
    computed: {
        toBeShown: function() {
            if(this.$parent.isCompleted && this.$parent.readyToConfirmInfo || this.$parent.isCompleted && this.$parent.readyToGoPay){
                return false ;
            }else{
                return this.$parent.isCompleted;
            }

        },
        productCC: function () {
            return localStorage.getItem('productCC');
        },
        productYear: function () {
            return localStorage.getItem('productYear');
        },
        taiwanYear: function () {
            var date = new Date();  
            var limitAge = {};
            limitAge = date.getFullYear() - 1929;
            returnVal = [];
            returnVal.push(limitAge)
            for(var i = 1; i < 30; i ++ ){
                limitAge --
                returnVal.push(limitAge);
            }

            return returnVal;   
        },
        taiwanMonth: function () {
            var months = [];
            for(var i = 1; i <= 12; i ++ ){
                months.push(i);
            }
            return months
        },
        getCurrentMonthDay: function () {
            if(this.insuredBirthMonth !== '') {
                var m = parseInt(this.releasePLateMonthDate.slice(0,2));        
                var y = parseInt(this.releasePlateYearDate.slice(0,3));       
                switch(m){            
                case 1: case 3:  case 5: case 7: case 8:case 10:  case    12:                
                    return 31;                
                    break;            
                case 2:                
                    if((y%4==0 && y%100!=0) || y%400==0){                    
                        return 29;                
                    }                
                    return 28;                
                    break;            
                default:                
                    return 30;                
                    break;        
                }
            }
        },
        thisMonthDays: function () {
            var returnVal = []; 
            for(var i = 1; i < this.getCurrentMonthDay; i ++) {
                returnVal.push(i);
            }
            return returnVal;
        },
        westernYear: function () {
            var date = new Date();  
            var currentWesternYear = {};
            currentWesternYear = date.getFullYear();
            returnVal = [];
            returnVal.push(currentWesternYear)
            for(var i = 1; i < 30; i ++ ){
                currentWesternYear --
                returnVal.push(currentWesternYear);
            }

            return returnVal;   
        },
        brandList: function () {
            var returnList = this.$parent.BrandList;
            return returnList;
        },
        showExamples: function () {
            var examples = [{'isShow': this.airProduceExample }, {'isShow': this.carLicenseExample}, {'isShow': this.engineNumExample}, {'isShow': this.motoFacDateExample}, {'isShow': this.issuedDayExample}, {'isShow': this.brandExample}];
            return examples;
        },
        tofocusSecondPlate: function() {
            if(this.plateNumberFirstArea.length > 2){

            }
        }
    },
    mounted: function(){
        var motorInfo = JSON.parse(localStorage.getItem('motorInfo'));
        if(motorInfo){
                this.motoMadeFactory = motorInfo['motocycleFactory'];
                this.plateNumberFirstArea = motorInfo['plateEng'];
                this.plateNumberSecondArea = motorInfo['plateNum'];
                this.newPlate = motorInfo['isNewPlate'];
                this.motoMadeFactory = motorInfo['motocycleFactory'];


                var motoRPD = motorInfo['motoReleasePlateDateForCheck'].split(',');
                for(var i = 0; i < motoRPD.length; i ++){
                    if( i == 0){
                        this.releasePlateYearDate = motoRPD[i];
                    }else if( i == 1){
                        this.releasePLateMonthDate = motoRPD[i];
                    }else{
                        this.releasePlateDayDate = motoRPD[i];
                    }
                }

                var motoFDC =  motorInfo['motoFactoryDateForCheck'].split(',');
                for(var i = 0; i < motoFDC.length; i ++){
                    if( i == 0){
                        this.releaseMotoYearDate = motoFDC[i];
                    }else if( i == 1){
                        this.releaseMotoMonthDate = motoFDC[i];
                    }
                }

                this.newPlate = motorInfo['isNewPlate'];
                this.engineNum = motorInfo['engineNumber'];
                this.executionDay = motorInfo['executionDay'];
                this.userEnteredProdcutCC = motorInfo['motocycleCC'];
        }else{

        }
    }
})

Vue.component('insured-form', {
    template: `
            <div class="container customerForm animated" style="margin-top:0px;"  v-bind:class="{ slideOutLeft: isSlide, slideInLeft: !isSlide }">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-4">
                        <strong>車主資料</strong>
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <input v-bind="applicantDataFromParent" @change="insuredSameAsApplicant" v-model="ischecked" type="checkbox" name="sameAsApplicant">
                            <span class="checkboxSpan">車主資料同上</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" v-show="!ischecked">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <select @change="relationShipVali" v-bind:class="{errorShow:relationshipInValid}" v-model="withInsuredRelationShipItem"  required class="form-control">
                                <option value="">請選擇與車主關係</option>
                                <option v-for="item in relationShipList" :value="item">{{ item.text }}</option>
                            </select>
                            <span  class="errorMessage" v-show="relationshipInValid">{{ relationshipErrorMsg }}</span>
                            <div class="iconErrorMessageBack" style="right: -25px;" v-show="relationshipInValid"></div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-4">
                        
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-5">
                            <div class="innerClass col-sm-10">
                                <input @change="checkInsuredLastName" v-bind:class="{errorShow:insuredLastNameInValid}" maxlength="10" class="form-control" v-model="insuredLastName" name="lastName" type="text" placeholder="姓(中文)" required>
                                <span  class="errorMessage" v-show="insuredLastNameInValid">{{ insuredLastNameErrorMsg }}</span>
                            </div>
                            <div class="innerClass col-sm-2">
                                <div class="iconErrorMessage" v-show="insuredLastNameInValid"></div>
                            </div> 
                        </div>
                        <div class="col-sm-7">
                            <div class="innerClass col-sm-12">
                                <input class="form-control" maxlength="10" @change="toCheckFirstNameVal" v-model="insuredFirstName" v-bind:class="{errorShow:insuredFirstNameInValid}"  name="firstName" type="text" placeholder="名(中文)" required>
                                <span  class="errorMessage" v-show="insuredFirstNameInValid">{{ insuredFirstNameErrorMsg }}</span>
                                  <div class="iconErrorMessageBack" v-show="insuredFirstNameInValid"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <input style="text-transform:uppercase" class="form-control" @change="checkPid" v-model="insuredPid" v-bind:class="{errorShow:insuredPidInValid}" maxlength="10" type="text" name="id" placeholder="身分證字號" required>
                            <span  class="errorMessage" v-show="insuredPidInValid">{{ insuredPidErrorMsg }}</span>
                            <div class="iconErrorMessageBack" style="right: -25px;" v-show="insuredPidInValid"></div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-3 birthSpan"><span>車主生日:</span></div>
                        <div class="col-sm-3">
                            <select @change="checkBirthYear" v-bind:class="{errorShow:BYearInValid}"  class="form-control" v-model="insuredBirthYear" id="birthYear" required>
                                <option>民國年</option>
                                <option v-for=" year in taiwanYear ">民國{{ year }}年</option>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <select @change="checkBirthMonth" v-bind:class="{errorShow:BMonthInValid}" :disabled="insuredBirthYear == '' "  class="form-control" v-model="insuredBirthMonth" id="birthMonth" required>
                                <option>月</option>
                                <option v-for=" month in taiwanMonth ">{{ month }} 月</option>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <div class="col-sm-12 innerClass">
                                <select @change="checkBirthDay" v-bind:class="{errorShow:BDayInValid}" class="form-control" :disabled="insuredBirthMonth == ''" v-model="insuredBirthDay" id="birthDay" required>
                                    <option>日</option>
                                    <option v-for=" day in thisMonthDays ">{{ day }} 號</option>
                                </select>
                                <div class="iconErrorMessageBack" v-show="BYearInValid || BMonthInValid || BDayInValid">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" v-show="BYearInValid || BMonthInValid || BDayInValid">
                    <div class="col-sm-4">
                        <div class="col-sm-12">
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <span class="errorMessage" v-show="BYearInValid || BMonthInValid || BDayInValid">{{ BYearErrorMsg }}{{ BMonthErrorMsg }}{{ BDayErrorMsg }} 請選擇車主生日。</span>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                       <div class="col-sm-12">
                            <div class="col-sm-12 innerClass">
                                 <input @change="checkMobile" v-bind:class="{errorShow:mobileInValid}"  class="form-control" maxlength="10" v-model="insuredMobile" type="text" name="mobile" placeholder="0912345678" required>
                                 <span class="errorMessage" v-show="mobileInValid">{{ mobileErrorMsg }}</span>
                                 <div class="iconErrorMessageBack" v-show="mobileInValid">
                                 </div>
                            </div>
                       </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-2 addr">
                            <select @change="checkCity" v-bind:class="{errorShow:addrCityInValid}" v-model="insuredCityId" class="form-control" id="city" required>
                                <option v-for="city in cityList" :value="city.id">{{ city.name }}</option>
                            </select>
                        </div>
                        <div class="col-sm-2 addr">
                            <select @change="checkArea" v-bind:class="{errorShow:addrAreaInValid}" v-model="insuredDistrictId" :disabled="insuredCityId == ''" class="form-control" id="city" required>
                                <option v-for=" area in areaList" :value="area.id" >{{ area.name }}</option>
                            </select>
                        </div>
                        <div class="col-sm-2 addr">
                            <input class="form-control" v-model="insuredZipcode" disabled type="text" name="zipcode" placeholder="區號" required>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-12 innerClass">
                                <input @change="checkAddr" v-bind:class="{errorShow:addrInValid}" :disabled="!insuredZipcode" type="text" name="addr" v-model="insuredAddr" class="form-control" placeholder="地址" required>
                                <div class="iconErrorMessageBack" v-show="addrCityInValid || addrAreaInValid || addrInValid" ></div>
                            </div>
                        </div>
                        <span class="errorMessage" style="padding-left:15px; top:5px;" v-show="addrCityInValid || addrAreaInValid || addrInValid">{{ addrCityErrorMsg }}{{ addrAreaErrorMsg }}{{ addrErrorMsg }} 請輸入正確地址，以利寄送保險證明文件與活動獎項。</span>
                     </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <input @change="checkEmail" v-bind:class="{errorShow:emailInValid}" class="form-control" v-model="insuredEmail" type="text" name="email" placeholder="E-mail" required>
                            <div class="iconErrorMessageBack" v-show="emailInValid" style="right:-25px"></div>
                        </div>
                        <span class="errorMessage" style="padding-left:15px;" v-show="emailInValid">{{ emailErrorMsg }}</span>
                    </div>
                </div>
                
                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <p><input type="checkbox" v-model="agreementRead" name="agreementCheckBox">
                            我已閱讀 << <a href="#" @click="showWebAnnouce" target="">網路要保聲明事項</a> >> ， << <a href="#" @click="personalPdfAnnouce">個人資料聲明事項</a> >>文件，並同意。</p>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7">
                        <button class="btn btn-primary NextButton " @click="completeStepOne">下一步</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return{
            ischecked: false,
            agreementRead: true,
            relationshipInValid: false,
            insuredLastNameInValid: false,
            insuredFirstNameInValid: false,
            insuredPidInValid: false,
            BYearInValid: false,
            BMonthInValid: false,
            BDayInValid: false,
            mobileInValid: false,
            addrInValid: false,
            addrCityInValid: false,
            addrAreaInValid: false,
            emailInValid: false,
            relationshipErrorMsg: '',
            insuredLastNameErrorMsg: '',
            insuredFirstNameErrorMsg: '',
            insuredPidErrorMsg: '',
            withInsuredRelationShipItem: {text: '', value: ''},
            withInsuredRelationShip: '',
            insuredLastName: '',
            insuredFirstName: '',
            insuredPid: '',
            gender: '',
            insuredBirthday: '',
            insuredBirthYear: '',
            insuredBirthMonth: '',
            insuredBirthDay: '',
            BYearErrorMsg: '',
            BMonthErrorMsg: '',
            BDayErrorMsg: '',
            mobileErrorMsg: '',
            addrCityErrorMsg: '',
            addrAreaErrorMsg: '',
            addrErrorMsg: '',
            emailErrorMsg: '',
            insuredMobile: '',
            insuredCityId: '',
            insuredDistrictId: '',
            insuredAddr: '',
            insuredEmail: '',
            insuredDataSameAsApplicant: {}
        }
    },
    methods: {
        showWebAnnouce: function () {
            $('#myModal').modal('show');
            this.$parent.$data.pdfContentToShow = true;
        },
        personalPdfAnnouce: function () {
            $('#myModal').modal('show');
            this.$parent.$data.pdfContentToShow = true;
        },
        insuredSameAsApplicant: function(event){
          if(this.ischecked){
              this.insuredLastName = this.insuredDataSameAsApplicant.applicantLastName;
              this.insuredFirstName = this.insuredDataSameAsApplicant.applicantFistName;
              this.insuredPid = this.insuredDataSameAsApplicant.applicantPid;
              this.gender = this.insuredDataSameAsApplicant.applicantGender;
              this.insuredBirthYear = this.insuredDataSameAsApplicant.applicantBirthYear;
              this.insuredBirthMonth = this.insuredDataSameAsApplicant.applicantBirthMonth;
              this.insuredBirthDay = this.insuredDataSameAsApplicant.applicantBirthDay;
              this.insuredMobile = this.insuredDataSameAsApplicant.applicantMobile;
              this.insuredCityId = this.insuredDataSameAsApplicant.applicantCityId;
              this.insuredDistrictId = this.insuredDataSameAsApplicant.applicantDistrictId;
              this.insuredZipcode = this.insuredDataSameAsApplicant.applicantZipcode;
              this.insuredAddr = this.insuredDataSameAsApplicant.applicantAddr;
              this.insuredEmail = this.insuredDataSameAsApplicant.applicantEmail;
              this.withInsuredRelationShipItem = { text: '本人', value: "SELF" };
              this.withInsuredRelationShip = "SELF";
          }else{
              this.insuredLastName = '';
              this.insuredFirstName = '';
              this.insuredPid = '';
              this.withInsuredRelationShip ='';
              this.gender = '';
              this.insuredBirthYear = '';
              this.insuredBirthMonth = '';
              this.insuredBirthDay = '';
              this.insuredMobile = '';
              this.insuredCityId = '';
              this.insuredDistrictId = '';
              this.insuredZipcode = '';
              this.insuredAddr = '';
              this.insuredEmail = '';
              this.withInsuredRelationShipItem = { text: '', value: '' };
              this.withInsuredRelationShip = '';
          }
        },
        completeStepOne: function(){
            var plate;
            switch(localStorage.getItem('productCC')) {
                case '0':
                    plate = 'green';
                    break;
                case '1':
                    plate = 'white';
                    break;
                case '2':
                    plate = 'yellow';
                    break;
                case '3':
                    plate = 'red';
                    break;
                default:
                    plate = '';
            }
            this.$parent.isAplicantValidateWellorNot = true;
            this.relationShipVali();
            this.checkInsuredLastName();
            this.toCheckFirstNameVal();
            this.checkPid();
            this.checkBirthYear();
            this.checkBirthMonth();
            this.checkBirthDay();
            this.checkMobile();
            this.checkCity();
            this.checkArea();
            this.checkAddr();
            this.checkEmail();
            this.$parent.isCompleted = true;
            this.$parent.processbarNu = 38;
            this.$parent.motoSpeedPosition['left'] = 400;
            this.$parent.insuredData['insuredLastName'] = this.insuredLastName;
            this.$parent.insuredData['insuredFirstName'] = this.insuredFirstName;
            this.$parent.insuredData['withInsuredRelationShipItem'] = this.withInsuredRelationShipItem;
            this.$parent.insuredData['withInsuredRelationShipItemText'] = this.withInsuredRelationShipItem.text;
            this.$parent.insuredData['withInsuredRelationShip'] = this.withInsuredRelationShip;
            this.$parent.insuredData['ischecked'] = this.ischecked;
            this.$parent.insuredData['insuredPid'] = this.insuredPid;
            this.$parent.insuredData['insuredGender'] = this.gender;
            this.$parent.insuredData['insuredBirthYear'] = this.insuredBirthYear;
            this.$parent.insuredData['insuredBirthMonth'] = this.insuredBirthMonth;
            this.$parent.insuredData['insuredBirthDay'] = this.insuredBirthDay;
            this.$parent.insuredData['insuredBirthdayForCheck'] = this.insuredBirthYear + ',' + this.insuredBirthMonth + ',' + this.insuredBirthDay;
            this.$parent.insuredData['insuredMobile'] = this.insuredMobile;
            this.$parent.insuredData['insuredCityId'] = this.insuredCityId;
            this.$parent.insuredData['insuredDistrictId'] = this.insuredDistrictId;
            this.$parent.insuredData['insuredZipcode'] = this.insuredZipcode;
            this.$parent.insuredData['insuredAddr'] = this.insuredAddr;
            this.$parent.insuredData['insuredEmail'] = this.insuredEmail;
            var applicantYear = parseInt(this.$parent.applicantData.applicantBirthYear.slice(2,4)) + 1911; 
            var applicantMonth = parseInt(this.$parent.applicantData.applicantBirthMonth.slice(0,2));        
            var applicantDay = parseInt(this.$parent.applicantData.applicantBirthDay.slice(0,2)); 
            var insuredYear = parseInt(this.insuredBirthYear.slice(2,4)) + 1911; 
            var insuredMonth = parseInt(this.insuredBirthMonth.slice(0,2));        
            var insuredDay = parseInt(this.$parent.insuredData.insuredBirthDay.slice(0,2));
            var sendDataBackFirstTime = {};
            sendDataBackFirstTime = {};
            sendDataBackFirstTime['applicantData'] = this.$parent.applicantData;
            sendDataBackFirstTime['applicantData']['applicantBirthYear'] = applicantYear;
            sendDataBackFirstTime['applicantData']['applicantBirthMonth'] = applicantMonth;
            sendDataBackFirstTime['applicantData']['applicantBirthDay'] = applicantDay;
            sendDataBackFirstTime['insuredData'] = this.$parent.insuredData;
            sendDataBackFirstTime['insuredData']['insuredBirthYear'] = insuredYear;
            sendDataBackFirstTime['insuredData']['insuredBirthMonth'] = insuredMonth;
            sendDataBackFirstTime['insuredData']['insuredBirthDay'] = insuredDay;
            sendDataBackFirstTime['productDetail'] = {};
            sendDataBackFirstTime['productDetail'].productYear = localStorage.getItem('productYear') + 'year';
            sendDataBackFirstTime['productDetail'].productCC = plate;
            console.log(JSON.stringify(sendDataBackFirstTime));
            localStorage.setItem('formStore', JSON.stringify(sendDataBackFirstTime))

            $.ajax({
                url: '/motorbike-mbr/journey/saveApplicantAndInsured',
                data: {data: JSON.stringify(sendDataBackFirstTime)},
                type:"POST",
                dataType: 'text',

                success: function(result){
                    console.log(result);
                    var data = JSON.parse(result);
                    localStorage.setItem('dataId', data["dataId"]);
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
           
            // this.$http.post(, ).then(response => {
            //     console.log('1234', response);
            // }, response => {
            //     // error callback
            // });
            
        },
        relationShipVali: function () {
            if(!this.withInsuredRelationShipItem){
                this.relationshipErrorMsg = '被保人關係是必選欄位'
                this.relationshipInValid = true;
                return false;
            }else{
                this.relationshipErrorMsg = '';
                this.relationshipInValid = false;
            }
        },
        checkInsuredLastName: function(event) {
            // name validation
            if(this.insuredLastName){
                if(this.insuredLastName.match(/[^\u3447-\uFA29]/ig)){
                    this.insuredLastName = '';
                    this.insuredLastNameInValid = true;
                    this.insuredLastNameErrorMsg = '請輸入正確中文姓名';
                    return false;
                }else{
                    this.insuredLastNameInValid = false;
                    this.lastNameErrorMsg = '';
                    this.$parent.motoSpeedPosition['left'] = 280;
                }
            }else if(this.insuredLastName == ''){
                this.insuredLastName = '';
                this.insuredLastNameInValid = true;
                this.insuredLastNameErrorMsg = '請輸入車主姓名';
                return false;
            }
        },
        toCheckFirstNameVal: function() {
            if(this.insuredFirstName){
                if(this.insuredFirstName.match(/[^\u3447-\uFA29]/ig)){
                    this.insuredFirstName = '';
                    this.insuredFirstNameInValid = true;
                    this.insuredFirstNameErrorMsg = '請輸入正確中文姓名';
                    return false;
                }else{
                    this.insuredFirstNameInValid = false;
                    this.insuredFirstNameErrorMsg = '';
                    this.$parent.motoSpeedPosition['left'] = 280;
                }
            }else if(this.insuredFirstName == ''){
                    this.insuredFirstName = '';
                    this.insuredFirstNameInValid = true;
                    this.insuredFirstNameErrorMsg = '請輸入車主姓名';
                    return false;
            }
        },
        checkPid: function () {
            if(this.insuredPid){
                // pid validation
                var regExpID=/^[a-z](1|2)\d{8}$/i;
                if(this.insuredPid.search(regExpID) == -1){
                    this.insuredPidInValid = true;
                    this.insuredPidErrorMsg = '身分證字號格式錯誤';
                    return false;
                }else {
                    //取出第一個字元和最後一個數字。
                    let firstChar = this.insuredPid.charAt(1).toUpperCase();
                    if(firstChar == 1){
                        this.gender = 'male';
                        this.pidFilled = true;
                    }else if (firstChar == 2) {
                        this.gender = 'female';
                        this.pidFilled = true;
                    }
                    this.insuredPidInValid = false;
                    this.$parent.motoSpeedPosition['left'] = 290;
                }
            }else if(this.insuredPid == ''){
                    this.insuredPidInValid = true;
                    this.insuredPidErrorMsg = '請輸入身分證字號';
                    return false;
            }
        },
        checkBirthYear: function () {
            //birthDay validation
            if(this.insuredBirthYear == '民國年' || this.insuredBirthYear == ''){
                this.BYearInValid = true;
                this.BYearErrorMsg = '';
                return false;
            }else{
                this.BYearInValid = false;
                this.BYearErrorMsg = '';
                this.$parent.motoSpeedPosition['left'] = 250;
            }
        },
        checkBirthMonth: function() {
            if (this.insuredBirthMonth == '月' || this.insuredBirthMonth == '') {
                this.BMonthInValid = true;
                this.BMonthErrorMsg = '';
                return false;
            }else{
                this.BMonthInValid = false;
                this.BMonthErrorMsg = '';
                this.$parent.motoSpeedPosition['left'] = 260;
            }
        },
        checkBirthDay: function() {
            if (this.insuredBirthDay == '日' || this.insuredBirthDay == '') {
                this.BDayInValid = true;
                this.BDayErrorMsg = '';
                return false;
            }else{
                this.BDayInValid = false;
                this.BMonthErrorMsg = '';
                this.$parent.motoSpeedPosition['left'] = 280;
            }
        },
        checkMobile: function () {
            if(this.insuredMobile){
                var re = /^[09]{2}[0-9]{8}$/;
                if (!re.test(this.insuredMobile)){
                    this.mobileInValid = true;
                    this.mobileErrorMsg = '格式錯誤，請提供行動電話如：0912345678';
                    return false;
                }else {
                    this.mobileInValid = false;
                    this.$parent.motoSpeedPosition['left'] = 310;
                }
            }else if(this.insuredMobile == ''){
                this.mobileInValid = true;
                this.mobileErrorMsg = '請提供行動電話如：0912345678';
                return false;
            }
        },
        checkCity: function () {
            if(!this.insuredCityId) {
                this.addrCityInValid = true;
                this.addrCityErrorMsg = '';
                return false;
            }else{
                this.addrCityInValid = false;
                this.$parent.motoSpeedPosition['left'] = 320;
            }
        },
        checkArea: function () {
           if(!this.insuredDistrictId) {
                this.addrAreaInValid = true;
                this.addrAreaErrorMsg = '';
                return false;
            } else {
                this.addrAreaInValid = false;
                this.$parent.motoSpeedPosition['left'] = 320;
            }
        },
        checkAddr: function() {
            if(!this.insuredAddr) {
                this.addrInValid = true;
                this.addrErrorMsg = '';
                return false;
            } else {
                this.addrInValid = false;
                this.$parent.motoSpeedPosition['left'] = 320;
            }
        },
        checkEmail: function () {
            if(this.insuredEmail){
                let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!reg.test(this.insuredEmail)){
                    this.emailInValid = true;
                    this.emailErrorMsg = '格式錯誤，請輸入正確email地址';
                    return false;
                }else{
                    this.emailInValid = false;
                    this.$parent.motoSpeedPosition['left'] = 330;
                }
            }else if(this.insuredEmail == ''){
                this.emailInValid = true;
                this.emailErrorMsg = '請輸入正確email地址';
                return false;
            }
        },
    },
    computed: {
        isSlide: function () {
            return this.$parent.isCompleted
        },
        applicantDataFromParent: function () {
            this.insuredDataSameAsApplicant = this.$parent.applicantData;
        },
        taiwanYear: function () {
            var date = new Date();  
            var limitAge = {};
            limitAge = date.getFullYear() - 1929;
            returnVal = [];
            returnVal.push(limitAge)
            for(var i = limitAge; i > 1; i -- ){
                limitAge --
                returnVal.push(limitAge);
            }

            return returnVal;   
        },
        taiwanMonth: function () {
            var months = [];
            for(var i = 1; i <= 12; i ++ ){
                months.push(i);
            }
            return months
        },
        getCurrentMonthDay: function () {
            if(this.insuredBirthMonth !== '') {
                var m = parseInt(this.insuredBirthMonth.slice(0,2));        
                var y = parseInt(this.insuredBirthYear.slice(2,4));       
                switch(m){            
                case 1: case 3:  case 5: case 7: case 8:case 10:  case    12:                
                    return 31;                
                    break;            
                case 2:                
                    if((y%4==0 && y%100!=0) || y%400==0){                    
                        return 29;                
                    }                
                    return 28;                
                    break;            
                default:                
                    return 30;                
                    break;        
                }
            }
        },
        thisMonthDays: function () {
            var returnVal = []; 
            for(var i = 1; i < this.getCurrentMonthDay; i ++) {
                returnVal.push(i);
            }
            return returnVal;
        },
        areaList: function() {
            var districtList = this.$parent.IdistrictList;
            var newAreaList = [];
            for(var i = 0; i < districtList.length; i++){
                if(districtList[i].cityId == this.insuredCityId ){
                    newAreaList.push((districtList[i]));
                }
            }
            return newAreaList;
        },
        cityList: function() {
            return this.$parent.IcityList;
        },
        insuredZipcode: function () {
            for(var i = 0; i < this.areaList.length; i ++){
                if(this.areaList[i].id == this.insuredDistrictId){
                    return this.areaList[i].zipCode;
                }
            }
            
        },
        relationShipList: function () {
            return this.$parent.RelatedList;
        }
    },
    mounted: function() {
         if(localStorage.getItem('formStore')){
            var formData = JSON.parse(localStorage.getItem('formStore'));
            console.log('2222222', formData);
            var insuredShownBirth = formData.insuredData['insuredBirthdayForCheck'];
            var birthForRefill = insuredShownBirth.split(',');
            for(var i = 0; i < birthForRefill.length; i++){
                switch(i){
                    case 0 : 
                        this.insuredBirthYear = birthForRefill[i];
                    break;
                    case 1 :
                        this.insuredBirthMonth = birthForRefill[i];
                    break;
                    case 2 :
                        this.insuredBirthDay = birthForRefill[i];
                    break;
                    default:
                }
            }
            this.ischecked = formData.insuredData['ischecked'];
            this.withInsuredRelationShip = formData.insuredData['withInsuredRelationShipItem'];
            this.insuredLastName = formData.insuredData['insuredLastName'];
            this.insuredFirstName = formData.insuredData['insuredFirstName'];
            this.insuredPid = formData.insuredData['insuredPid'];
            this.gender = formData.insuredData['insuredGender'];
            this.insuredMobile = formData.insuredData['insuredMobile'];
            this.insuredAddr = formData.insuredData['insuredAddr'];
            this.insuredEmail = formData.insuredData['insuredEmail'];
            this.insuredData = formData.insuredData;
            
         }else{

         }
    }
})

Vue.component('applicant-form', {
    template: `
            <div class="container customerForm animated " v-bind:class="{ slideOutLeft: isSlide, slideInLeft: !isSlide }">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-4">
                        <strong>要保人資料</strong>
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-5">
                            <div class="innerClass col-sm-10">
                                <input v-model="applicantLastName" maxlength="10"  v-bind:class="{errorShow:lastNameInValid}" v-bind="toComputedData" @change="toCheckLastNameVal" class="form-control" name="lastName" type="text" placeholder="姓(中文)" required>
                                <span  class="errorMessage" v-show="lastNameInValid || firstNameInValid">{{ lastNameErrorMsg }}</span>
                            </div>
                            <div class="innerClass col-sm-2">
                                <div class="iconErrorMessage" v-show="lastNameInValid"></div>
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <div class="innerClass col-sm-12">
                                  <input v-model="applicantFirstName" maxlength="10" v-bind:class="{errorShow:firstNameInValid}" class="form-control" @change="toCheckFirstNameVal"  name="firstName" type="text" placeholder="名(中文)"required>
                                  <span  class="errorMessage" v-show="lastNameInValid || firstNameInValid">{{ firstNameErrorMsg }}</span>
                                  <div class="iconErrorMessageBack" v-show="firstNameInValid"></div>
                            </div>
                        </div>     
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <div class="innerClass col-sm-12">
                                <input style="text-transform:uppercase" v-model="applicantPid" v-bind:class="{errorShow:pidInValid}"  @change="checkPid" maxlength="10" class="form-control" type="text" name="id" placeholder="身分證字號" required>
                                <span  class="errorMessage" v-show="pidInValid">{{ pidErrorMsg }}</span>
                                <div class="iconErrorMessageBack" v-show="pidInValid"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-sm-12" v-show="!pidInValid">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="gender" v-bind:class="{ishidden: !pidFilled}">
                            <span>{{ applicantLastName }} {{ applicantFirstName }} {{ welcomeMsg }}</span>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-3 birthSpan"><span>要保人生日:</span></div>
                        <div class="col-sm-3">
                            <select @change="checkBirthYear" v-bind:class="{errorShow:BYearInValid}"  class="form-control" v-model="applicantBirthYear" id="birthYear" required>
                                <option>民國年</option>
                                <option v-for=" year in taiwanYear">民國{{ year }}年</option>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <select @change="checkBirthMonth" v-bind:class="{errorShow:BMonthInValid}" :disabled="applicantBirthYear == '' "  class="form-control" v-model="applicantBirthMonth" id="birthMonth" required>
                                <option>月</option>
                                <option v-for=" month in taiwanMonth ">{{ month }} 月</option>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <div class="col-sm-12 innerClass">
                                <select @change="checkBirthDay" v-bind:class="{errorShow:BDayInValid}" class="form-control" :disabled="applicantBirthMonth == ''" v-model="applicantBirthDay" id="birthDay" required>
                                    <option>日</option>
                                    <option v-for=" day in thisMonthDays ">{{ day }} 號 </option>
                                </select>
                                <div class="iconErrorMessageBack" v-show="BYearInValid || BMonthInValid || BDayInValid">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-sm-12" v-show="BYearInValid || BMonthInValid || BDayInValid">
                    <div class="col-sm-4">
                        <div class="col-sm-12">
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <span class="errorMessage" v-show="BYearInValid || BMonthInValid || BDayInValid">{{ BYearErrorMsg }}{{ BMonthErrorMsg }}{{ BDayErrorMsg }}  請選擇要保人生日。</span>
                        </div>
                    </div>
                </div>
                
                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                       <div class="col-sm-12">
                            <div class="col-sm-12 innerClass">
                                 <input @change="checkMobile" v-bind:class="{errorShow:mobileInValid}"  class="form-control" maxlength="10" v-model="applicantMobile" type="text" name="mobile" placeholder="0912345678" required>
                                 <span class="errorMessage" v-show="mobileInValid">{{ mobileErrorMsg }}</span>
                                 <div class="iconErrorMessageBack" v-show="mobileInValid">
                                 </div>
                            </div>
                       </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-2 addr">
                            <select @change="checkCity" v-bind:class="{errorShow:addrCityInValid}" v-model="applicantLivingCity" class="form-control" id="city" required>
                                <option v-for="city in cityList" :value="city">{{ city.name }}</option>
                            </select>
                        </div>
                        <div class="col-sm-2 addr">
                            <select @change="checkArea" v-bind:class="{errorShow:addrAreaInValid}" v-model="applicantLivingDistrict" :disabled="applicantLivingCity == ''" class="form-control" id="city" required>
                                <option v-for=" area in areaList" :value="area == applicantLivingDistrict" >{{ area.name }}</option>
                            </select>
                        </div>
                        <div class="col-sm-2 addr">
                            <input class="form-control" v-model="applicantLivingZipCode" disabled type="text" name="zipcode" placeholder="區號" required>
                        </div>
                        <div class="col-sm-6">
                            <div class="col-sm-12 innerClass">
                                <input @change="checkAddr" v-bind:class="{errorShow:addrInValid}" :disabled="!applicantLivingZipCode" type="text" name="addr" v-model="applicantAddr" class="form-control" placeholder="地址" required>
                                <div class="iconErrorMessageBack" v-show="addrCityInValid || addrAreaInValid || addrInValid" ></div>
                            </div>
                        </div>
                        <span class="errorMessage" style="padding-left:15px; top:5px;" v-show="addrCityInValid || addrAreaInValid || addrInValid">{{ addrCityErrorMsg }}{{ addrAreaErrorMsg }}{{ addrErrorMsg }} 請輸入正確地址，以利寄送保險證明文件與活動獎項。</span>
                     </div>
                </div>
                
                <div class="col-sm-12">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                        <div class="col-sm-12">
                            <input @change="checkEmail" v-bind:class="{errorShow:emailInValid}" class="form-control" v-model="applicantEmail" type="text" name="email" placeholder="E-mail" required>
                            <div class="iconErrorMessageBack" v-show="emailInValid" style="right:-25px"></div>
                        </div>
                        <span class="errorMessage" style="padding-left:15px;" v-show="emailInValid">{{ emailErrorMsg }}</span>
                    </div>
                </div>
                {{applicantLivingDistrict}}
                {{applicantValidateTrigger}}
                <div class="col-sm-12 errorMessage">
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-7 ">
                    <div class="col-sm-2">
                        
                    </div>
                    <div class="col-sm-10">
                    </div>
                    </div>
                </div>
            </div>
            <div class="spanLine"></div>
        </div>
    `,
    data: function() {
        return {
            lastNameInValid: false,
            firstNameInValid: false,
            pidInValid: false,
            pidFilled: false,
            BYearInValid: false,
            BMonthInValid: false,
            BDayInValid: false,
            mobileInValid: false,
            addrInValid: false,
            addrCityInValid: false,
            addrAreaInValid: false,
            emailInValid: false,
            lastNameErrorMsg: '',
            firstNameErrorMsg: '',
            emailErrorMsg: '',
            pidErrorMsg: '',
            BYearErrorMsg: '',
            BMonthErrorMsg: '',
            BDayErrorMsg: '',
            mobileErrorMsg: '',
            addrCityErrorMsg: '',
            addrAreaErrorMsg: '',
            addrErrorMsg: '',
            applicantLastName: '',
            applicantFirstName: '',
            applicantPid: '',
            gender: '',
            welcomeMsg: '',
            applicantBirthYear: '',
            applicantBirthMonth: '',
            applicantBirthDay: '',
            applicantMobile: '',
            applicantLivingCityId: '',
            applicantAddr: '',
            applicantEmail: ''
        }
    },
    methods: {
        toCheckLastNameVal: function(event) {
            // name validation
            if(this.applicantLastName){
                if(this.applicantLastName.match(/[^\u3447-\uFA29]/ig)){
                    this.applicantLastName = '';
                    this.lastNameInValid = true;
                    this.lastNameErrorMsg = '請輸入正確中文姓名';
                }else{
                    this.lastNameInValid = false;
                    this.firstNameInValid = false;
                    this.lastNameErrorMsg = '';
                    this.$parent.motoSpeedPosition['left'] = 280;
                }
            }else if (this.applicantLastName == ''){
                    this.applicantLastName = '';
                    this.lastNameInValid = true;
                    this.lastNameErrorMsg = '請輸入正確中文姓名';
            }
        },
        toCheckFirstNameVal: function() {
            if(this.applicantFirstName){
                if(this.applicantFirstName.match(/[^\u3447-\uFA29]/ig)){
                    this.applicantFirstName = '';
                    this.firstNameInValid = true;
                    this.firstNameErrorMsg = '請輸入正確中文姓名';
                }else{
                    this.lastNameInValid = false;
                    this.firstNameInValid = false;
                    this.lastNameErrorMsg = '';
                    this.$parent.motoSpeedPosition['left'] = 280;
                }
            }else if(this.applicantFirstName == '' ){
                this.applicantFirstName = '';
                this.firstNameInValid = true;
                this.firstNameErrorMsg = '請輸入正確中文姓名';
            }
        },
        checkCity: function () {
            if(!this.applicantLivingCity || this.applicantLivingCity == '') {
                this.addrCityInValid = true;
                this.addrCityErrorMsg = '';
            }else{
                this.addrCityInValid = false;
                this.applicantLivingCityId = this.applicantLivingCity.id; 
                this.$parent.motoSpeedPosition['left'] = 320;
            }
        },
        checkArea: function () {
           if(!this.applicantLivingDistrictId || this.applicantLivingDistrictId == '') {
                this.addrAreaInValid = true;
                this.addrErrorMsg = ''
            } else {
                this.addrAreaInValid = false;
                this.$parent.motoSpeedPosition['left'] = 320;
            }
        },
        checkAddr: function() {
            if(!this.applicantAddr || this.applicantAdd == '') {
                this.addrInValid = true;
                this.addrErrorMsg = ''
            } else {
                this.addrInValid = false;
                this.$parent.motoSpeedPosition['left'] = 320;
            }
        },
        checkBirthYear: function () {
            //birthDay validation
            if(this.applicantBirthYear == '民國年' || this.applicantBirthYear == ''){
                this.BYearInValid = true;
                this.BYearErrorMsg = '';
            }else{
                this.BYearInValid = false;
                this.BYearErrorMsg = '';
                this.$parent.motoSpeedPosition['left'] = 250;
            }
        },
        checkBirthMonth: function() {
            if (this.applicantBirthMonth == '月' || this.applicantBirthMonth == '') {
                this.BMonthInValid = true;
                this.BMonthErrorMsg = '';
            }else{
                this.BMonthInValid = false;
                this.BMonthErrorMsg = '';
                this.$parent.motoSpeedPosition['left'] = 260;
            }
        },
        checkBirthDay: function() {
            if (this.applicantBirthDay == '日' || this.applicantBirthDay == '') {
                this.BDayInValid = true;
                this.BDayErrorMsg = ''
            }else{
                this.BDayInValid = false;
                this.BMonthErrorMsg = '';
                this.$parent.motoSpeedPosition['left'] = 280;
            }
        },
        checkPid: function () {
            if(this.applicantPid){
                // pid validation
                var regExpID=/^[a-z](1|2)\d{8}$/i;
                if(this.applicantPid.search(regExpID) == -1){
                    this.pidInValid = true;
                    this.pidErrorMsg = '身分證字號格式錯誤';
                }else {
                    // 取出第一個字元和最後一個數字。
                    let firstChar = this.applicantPid.charAt(1).toUpperCase();
                    if(firstChar == 1){
                        this.welcomeMsg = '先生，您好！歡迎來到凱萊機車保險。';
                        this.gender = 'male';
                        this.pidFilled = true;
                    }else if (firstChar == 2) {
                        this.welcomeMsg = '小姐，您好！歡迎來到凱萊機車保險。';
                        this.gender = 'female';
                        this.pidFilled = true;
                    }
                    this.pidInValid = false;
                    this.$parent.motoSpeedPosition['left'] = 290;
                }
            }else if(this.applicantPid == ''){
                this.pidInValid = true;
                this.pidErrorMsg = '請輸入身分證字號';
            }
        },
        checkMobile: function () {
            if(this.applicantMobile){
                var re = /^[09]{2}[0-9]{8}$/;
                if (!re.test(this.applicantMobile)){
                    this.mobileInValid = true;
                    this.mobileErrorMsg = '格式錯誤，請提供行動電話如：0912345678';
                }else {
                    this.mobileInValid = false;
                    this.$parent.motoSpeedPosition['left'] = 310;
                }
            }else if(this.applicantMobile == ''){
                this.mobileInValid = true;
                this.mobileErrorMsg = '請提供行動電話如：0912345678';
            }
        },
        checkEmail: function () {
            if(this.applicantEmail){
                let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!reg.test(this.applicantEmail)){
                    this.emailInValid = true;
                    this.emailErrorMsg = '格式錯誤，請輸入正確email地址';
                }else{
                    this.emailInValid = false;
                    this.$parent.motoSpeedPosition['left'] = 330;
                }
            }else if(this.applicantEmail == ''){
                this.emailInValid = true;
                this.emailErrorMsg = '請輸入正確email地址';
            }
        },
        clickGetCityAndArea: function() {
            $.ajax({url: "/motorbike-mbr/journey/initData", success: function(result){
               vm.$data.AcityList = result.cityList;
               vm.$data.AdistrictList = result.areaList;
               vm.$data.IcityList = result.cityList;
               vm.$data.IdistrictList = result.areaList;
               vm.$data.RelatedList = result.relationshipList;
               vm.$data.BrandList = result.brandList;
               console.log(result);
             }})
        }
    },
    computed: {
        isSlide: function() {
            return this.$parent.isCompleted;
        },
        toComputedData: function() {
            var applicantPersonalData = {};
            applicantPersonalData['applicantLastName'] = this.applicantLastName;
            applicantPersonalData['applicantFistName'] = this.applicantFirstName;
            applicantPersonalData['applicantPid'] = this.applicantPid;
            applicantPersonalData['applicantGender'] = this.gender;
            applicantPersonalData['applicantRefillAddr'] = [];
            applicantPersonalData['applicantRefillAddr'].push(this.applicantLivingCity);
            applicantPersonalData['applicantRefillAddr'].push(this.applicantLivingDistrict);
            applicantPersonalData['applicantBirthday'] = this.applicantBirthYear + ',' + this.applicantBirthMonth + ',' + this.applicantBirthDay;
            applicantPersonalData['applicantBirthYear'] = this.applicantBirthYear;
            applicantPersonalData['applicantBirthMonth'] = this.applicantBirthMonth;
            applicantPersonalData['applicantBirthDay'] = this.applicantBirthDay;
            applicantPersonalData['applicantMobile'] = this.applicantMobile;
            applicantPersonalData['applicantCityId'] = this.applicantLivingCityId;
            applicantPersonalData['applicantDistrictId'] = this.applicantLivingDistrictId;
            applicantPersonalData['applicantZipcode'] = this.applicantLivingZipCode;
            applicantPersonalData['applicantAddr'] = this.applicantAddr;
            applicantPersonalData['applicantEmail'] = this.applicantEmail;
            this.$parent.applicantData = applicantPersonalData;

        },
        areaList: function() {
            var districtList = this.$parent.AdistrictList;
            var newAreaList = [];
            for(var i = 0; i < districtList.length; i++){
                if(districtList[i].cityId == this.applicantLivingCityId ){
                    newAreaList.push((districtList[i]));
                }
            }
            return newAreaList;
        },
        cityList: function() {
            return this.$parent.AcityList;
        },
        applicantLivingDistrictId: function () {
            return this.applicantLivingDistrict.id;
        },
        applicantLivingZipCode: function () {
            return this.applicantLivingDistrict.zipCode;
        },
        taiwanYear: function () {
            var date = new Date();  
            var limitAge = {};
            limitAge = date.getFullYear() - 1929;
            returnVal = [];
            returnVal.push(limitAge)
            for(var i = limitAge; i > 1; i -- ){
                limitAge --
                returnVal.push(limitAge);
            }

            return returnVal;   
        },
        taiwanMonth: function () {
            var months = [];
            for(var i = 1; i <= 12; i ++ ){
                months.push(i);
            }
            return months
        },
        getCurrentMonthDay: function () {
            if(this.applicantBirthMonth !== '') {
                var m = parseInt(this.applicantBirthMonth.slice(0,2));        
                var y = parseInt(this.applicantBirthYear.slice(0,3));       
                switch(m){            
                case 1: case 3:  case 5: case 7: case 8:case 10:  case    12:                
                    return 31;                
                    break;            
                case 2:                
                    if((y%4==0 && y%100!=0) || y%400==0){                    
                        return 29;                
                    }                
                    return 28;                
                    break;            
                default:                
                    return 30;                
                    break;        
                }
            }
        },
        thisMonthDays: function () {
            var returnVal = []; 
            for(var i = 1; i < this.getCurrentMonthDay; i ++) {
                returnVal.push(i);
            }
            return returnVal;
        },
        applicantValidateTrigger: function () {
           this.$parent.isAplicantValidateWellorNot;
           if(this.$parent.isAplicantValidateWellorNot){
                this.toCheckLastNameVal();
                this.toCheckFirstNameVal();
                this.checkCity();
                this.checkArea();
                this.checkAddr();
                this.checkBirthYear();
                this.checkBirthMonth();
                this.checkBirthDay();
                this.checkPid();
                this.checkMobile();
                this.checkEmail();
            }
            
        },
        applicantLivingCity: function () {
                 var formData = JSON.parse(localStorage.getItem('formStore'));
                 if(formData){
                    var applicantShownAddr = formData.applicantData['applicantRefillAddr'];
                     for(var i = 0; i < applicantShownAddr.length; i++){
                        if(i == 0){
                            return applicantShownAddr[i];
                        }
                     }
                 }else{
                     return {}
                 }
        },
        applicantLivingDistrict: function(){
                var formData = JSON.parse(localStorage.getItem('formStore'));
                if(formData){
                      var applicantShownAddr = formData.applicantData['applicantRefillAddr'];
                    for(var i = 0; i < applicantShownAddr.length; i++){
                        if(i == 1){
                            return applicantShownAddr[i];
                        }
                    }
                }else{
                    return {}
                }
        }
    },
    created: function() {
        this.clickGetCityAndArea();
    },
    mounted: function() {
         if(localStorage.getItem('formStore')){
            var formData = JSON.parse(localStorage.getItem('formStore'));
            if(formData){
                var applicantShownBirth = formData.applicantData['applicantBirthday'];
            var birthForRefill = applicantShownBirth.split(',');
            for(var i = 0; i < birthForRefill.length; i++){
                switch(i){
                    case 0 : 
                        this.applicantBirthYear = birthForRefill[i];
                    break;
                    case 1 :
                        this.applicantBirthMonth = birthForRefill[i];
                    break;
                    case 2 :
                        this.applicantBirthDay = birthForRefill[i];
                    break;
                    default:
                }
            }

            
            this.applicantLastName = formData.applicantData['applicantLastName'];
            this.applicantFirstName = formData.applicantData['applicantFistName'];
            this.applicantPid = formData.applicantData['applicantPid'];
            this.gender = formData.applicantData['applicantGender'];
            this.applicantMobile = formData.applicantData['applicantMobile'];
            this.applicantAddr = formData.applicantData['applicantAddr'];
            this.applicantEmail = formData.applicantData['applicantEmail'];
            this.insuredData = formData.insuredData;
            }
            
            
         }else{

         }
        
        if(this.applicantValidateTrigger){
            this.toCheckLastNameVal();
            this.toCheckFirstNameVal();
            this.checkCity();
            this.checkArea();
            this.checkAddr();
            this.checkBirthYear();
            this.checkBirthMonth();
            this.checkBirthDay();
            this.checkPid();
            this.checkMobile();
            this.checkEmail();
        }
    }
})

Vue.component('my-process', {
    template: `
        <div class="timeLine-wrap container">
            <div class="row">
                <div class="timeLineDiv">
                    <div class="eventDivs">
                        <div class="eventDiv" v-for="(step, index) in steps">
                            <div class="specialIcon">
                                <div class="circle" v-bind:class="{circleComplete: step.stepComplete}">
                                    <h3>{{ index + 1 }}</h3>
                                    <div>{{ step.text }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="time-bar">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" v-bind:style="{ width: processNum + '%' }">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                    </div>
                    <div class="motoOwl"  v-bind:style="{position: 'relative', top: '-107px', left: speedPosition + 'px' }">
                        <img src="images/owlMoto.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {

        }
    },
    computed: {
        speedPosition: function() {
          return this.$parent.motoSpeedPosition.left;
        },
        processNum: function () {
            return this.$parent.processbarNu;
        },
        steps: function() {
            return this.$parent.steps;
        }
    },

})
