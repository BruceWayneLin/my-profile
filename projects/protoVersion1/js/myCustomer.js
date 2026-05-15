/**
 * Created by wayne on 2017/03/12.
 */
$(function(){

 $(document).on('scroll', function(){
     var disNavBar = $('.navbar').offset().top;
     if(disNavBar >= 160){
         $('.navbar-default').css({
             "background-color": "white",
         });
         $('.fa.fa-bars').css({
             "color" : "#e84566",
         });
         $('.navbar-toggle').css({
             "color" : "#e84566",
         })
     }else{
         $('.navbar-default').css({
             "background-color": "transparent",
         });
         $('.fa.fa-bars').css({
             "color" : "white",
         });
         $('.navbar-toggle').css({
             "color" : "white",
         })
     }

 })

 $(document).on('click', '#submitedBtn', function(){
   $.mobile.loading('show');
   $('#firstSlide').addClass('animated fadeOutLeft');
   $(this).addClass('animated fadeOutUp');
     $('.intro-body .container').css({
         "padding-bottom" : "10px",
         "padding-top" : "140px"
     });
     $('.intro-body').css({
         "padding-bottom" : "40px",
     });
     $('#slide').removeClass('firstIntro');

     $('#slide').css({
         "top" : "-167px",
     });

   for(var i = 0; i < 4; i++)
     {
         var cardsHtml  = '';
         cardsHtml += '<div class="card col-sm-3 animated slideInRight">';
         cardsHtml += '<div class="box">';
         cardsHtml += '<div class="img-responsive">';

         if(i == 3){
             cardsHtml += '<div class="productIntroFourth">';
         }else{
             cardsHtml += '<div class="productIntro">';
         }

         cardsHtml += '</div>';
         cardsHtml += '</div>';
         cardsHtml += '<div class="card-block">';
         cardsHtml += '<div class="card-content">';
         if(i == 0){
             cardsHtml += '<h4>20/200 百萬</h4>';
             cardsHtml += '<span> NT: 658 </span>';
         }else if(i == 1){
             cardsHtml += '<h4>20/200 百萬</h4>';
             cardsHtml += '<span class="discount"> NT: 2212 </span>';
             cardsHtml += '<span> NT: 1920 </span>';
         }else if(i == 2){
             cardsHtml += '<h4>20/200 百萬</h4>';
             cardsHtml += '<h4>20/400 百萬</h4>';
             cardsHtml += '<span> NT: 2309 </span>';
         }else if(i == 3){
             cardsHtml += '<h4>其他方案?</h4>';
         }

         if(i == 0 || i == 2){
             cardsHtml += '<p class="card-title">1 年</p>';
         }else if(i == 1){
             cardsHtml += '<p class="card-title">2 年</p>';
         }else if(i == 3){
             cardsHtml += '<p class="card-title"></p>';
         }

         if(i == 0){
             cardsHtml += '<p class="card-text">強制險</p>';
         }else if(i == 1){
             cardsHtml += '<p class="card-text">強制險 + 駕駛人</p>';
         }else if(i == 2 ){
             cardsHtml += '<p class="card-text">強制險 + 駕駛人 + 第三責任</p>';
         }else if(i == 3){
             cardsHtml += '<p class="card-text"></p>';
         }
         cardsHtml += '</div>';

         if(i == 3){
             cardsHtml += '<button  class="btn btn-default productOther" value="2">選擇</button>';
         }else{
             cardsHtml += '<button  class="btn btn-default productGo" value="0">選擇</button>';
         }
         cardsHtml += '</div>';
         cardsHtml += '</div>';
         cardsHtml += '</div>';

         $('#slide').append(cardsHtml);
     }
     $.mobile.loading('hide');
  });

 $(document).on('click', '.productOther', function(){
     $.mobile.loading('show');
     $(this).parents('.card').removeClass('slideInRight').addClass('slideOutUp');
     $(this).parents('#slide').find('.slideInRight').removeClass('slideInRight').addClass('flipOutY');
     var toCallAjax = function() {
         $('#slide').empty();
         $('#slide').css({
             "top": "190px"
         });

         $.ajax({
             url: "js/json/package.json",
             success: function(result){
                 // when upload need to change json parse
                 var end = JSON.parse(result);
                 var items = end.items;

                 $.each(items, function(index, item){
                     var cardsHtmlMore = '';
                     cardsHtmlMore += '<div class="card col-sm-3 animated slideInRight">';
                     cardsHtmlMore += '<div class="box">';
                     cardsHtmlMore += '<div class="img-responsive">';
                     cardsHtmlMore += '<div class="productIntro">';

                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '<div class="card-block">';
                     cardsHtmlMore += '<div class="card-content">';
                     for(var i = 0; i < item.pictureTitle.length; i++){
                         cardsHtmlMore += '<h4>' + item.pictureTitle[i]  + '</h4>';
                     }

                     if(item.discount == "true"){
                         cardsHtmlMore += '<span class="discount">' + item.pictureDisPrice + '</span>';
                         cardsHtmlMore += '<span>' + item.picturePrice + '</span>';
                     }else{
                         cardsHtmlMore += '<span>' + item.picturePrice + '</span>';
                     }
                     cardsHtmlMore += '<p class="card-title">' + item.years + '</p>';
                     cardsHtmlMore += '<p class="card-text">' + item['card-text'] + '</p>';
                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '<button class="btn btn-default productGo" value="1">選擇</button>';
                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '</div>';

                     $('#slide').append(cardsHtmlMore);
                 })
             }});
     };
     setTimeout(toCallAjax, 1000);
     $.mobile.loading('hide');
    });

 $(document).on('click', '.productGo', function(){
        $.mobile.loading('show');
        $(this).parents('.card').removeClass('slideInRight').addClass('slideOutUp');
        $(this).parents('#slide').find('.slideInRight').removeClass('slideInRight').addClass('flipOutY');
        console.log($(this).val());
        if($(this).val() == 1){
            $('#slide').css({
                "top": "0px",
            });
        }else{
            $('#slide').css({
                "top": "0px",
            });
        }
        setTimeout(function(){
            $('#slide').empty();
            $('#slide').css({
                "margin-top": "180px",
                "margin-bottom": "180px"
            });
            $('.intro-body').css({
                "height": "auto"
            });
            var registerHtml = '';
            registerHtml += '<div class="col-sm-4"></div>';
            registerHtml += '<div class="loginDiv col-sm-2">';
            registerHtml += '<button id="loginBtn" class="btn btn-default"><h3>登入</h3></button>';
            registerHtml += '</div>';
            registerHtml += '<div class="registerDiv col-sm-2">';
            registerHtml += '<button id="registerBtn" class="btn btn-primary"><h3>註冊</h3></button>';
            registerHtml += '</div>';
            registerHtml += '<div class="col-sm-4"></div>';

            $('#slide').append(registerHtml);
        }, 1000);
        $.mobile.loading('hide');
 });

    $(document).on('click', '#registerBtn', function(){
        $.mobile.loading('show');
        $(this).addClass('animated fadeOutUp');
        setTimeout(function(){
            window.location = './registerForm.html'
        }, 1000);
        $.mobile.loading('hide');
    });

    $(document).on('click', '#loginBtn', function(){
        $.mobile.loading('show');
        $(this).addClass('animated fadeOutUp');
        setTimeout(function(){
            window.location = './login.html'
        }, 1000);
        $.mobile.loading('hide');
    });

    $(document).on('click', '.cancelbtn', function(){
        $.mobile.loading('show');
        $(this).addClass('animated fadeOutUp');
        setTimeout(function(){
            window.location = './index.html'
        }, 1000);
        $.mobile.loading('hide');
    });


    $(document).on('click', '#loginBakIndex', function(){
        $.mobile.loading('show');
        $(this).addClass('animated fadeOutUp');
        window.location = './index.html';
        $.mobile.loading('hide');
    });

    $(document).on('click', '.btnContainer button', function(){
        $.mobile.loading('show');
        $(this).addClass('animated fadeOutUp');

        setTimeout(function(){
            $('#slideOfCardCc').hide();
            $('#selectedCardCc').removeClass('hide');
            $('#selectedCardCc').addClass('animated slideInRight');

        }, 1000);



        $.mobile.loading('hide');
    });


});
