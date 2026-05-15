/**
 * Created by wayne on 2017/03/12.
 */
$(function(){

 $(document).on('click', '#submitedBtn', function(){
   $.mobile.loading('show');
   $('#firstSlide').addClass('animated fadeOutLeft');
   $(this).addClass('animated fadeOutUp');

     $('#slide').removeClass('firstIntro');

   for(var i = 0; i < 4; i++)
     {
         var cardsHtml  = '';
         cardsHtml += '<div class="card col-sm-3 animated slideInRight">';
         cardsHtml += '<div class="img-responsive">';

         if(i == 3){
             cardsHtml += '<div class="productIntroFourth">';
         }else{
             cardsHtml += '<div class="productIntro">';
         }

         if(i == 0){
             cardsHtml += '<h2>20/200 Million</h2>';
             cardsHtml += '<span> NT: 658 </span>';
         }else if(i == 1){
             cardsHtml += '<h2>20/200 Million</h2>';
             cardsHtml += '<span class="discount"> NT: 2212 </span>';
             cardsHtml += '<span> NT: 1920 </span>';
         }else if(i == 2){
             cardsHtml += '<h2>20/200 Million</h2>';
             cardsHtml += '<h2>20/400 Million</h2>';
             cardsHtml += '<span> NT: 2309 </span>';
         }else if(i == 3){
             cardsHtml += '<h2>Other Options?</h2>';
         }

         cardsHtml += '</div>';
         cardsHtml += '</div>';
         cardsHtml += '<div class="card-block">';
         cardsHtml += '<div class="card-content">';
         if(i == 0 || i == 2){
             cardsHtml += '<h3 class="card-title">1 year</h3>';
         }else if(i == 1){
             cardsHtml += '<h3 class="card-title">2 year</h3>';
         }else if(i == 3){
             cardsHtml += '<h3 class="card-title"></h3>';
         }

         if(i == 0){
             cardsHtml += '<p class="card-text">CTPL</p>';
         }else if(i == 1){
             cardsHtml += '<p class="card-text">CTPL + Driver</p>';
         }else if(i == 2 ){
             cardsHtml += '<p class="card-text">CTPL + Driver + VTPL</p>';
         }else if(i == 3){
             cardsHtml += '<p class="card-text"></p>';
         }
         cardsHtml += '</div>';

         if(i == 3){
             cardsHtml += '<button  class="btn btn-default productOther">選擇</button>';
         }else{
             cardsHtml += '<button  class="btn btn-default productGo">選擇</button>';
         }
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
             "top": "250px"
         });
         $('#intro').css({
             "margin-top": "50px"
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
                     cardsHtmlMore += '<div class="img-responsive">';
                     cardsHtmlMore += '<div class="productIntro">';

                     for(var i = 0; i < item.pictureTitle.length; i++){
                         cardsHtmlMore += '<h2>' + item.pictureTitle[i]  + '</h2>';
                     }

                     if(item.discount == "true"){
                         cardsHtmlMore += '<span class="discount">' + item.pictureDisPrice + '</span>';
                         cardsHtmlMore += '<span>' + item.picturePrice + '</span>';
                     }else{
                         cardsHtmlMore += '<span>' + item.picturePrice + '</span>';
                     }
                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '<div class="card-block">';
                     cardsHtmlMore += '<div class="card-content">';
                     cardsHtmlMore += '<h3 class="card-title">' + item.years + '</h3>';
                     cardsHtmlMore += '<p class="card-text">' + item['card-text'] + '</p>';
                     cardsHtmlMore += '</div>';
                     cardsHtmlMore += '<button class="btn btn-default productGo">選擇</button>';
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
        setTimeout(function(){
            $('#slide').empty();
            $('#slide').css({
                "top": "283px"
            });
            $('.intro-body').css({
                "height": "auto"
            });
            var registerHtml = '';
            registerHtml += '<div class="loginDiv col-sm-6">';
            registerHtml += '<button id="loginBtn" class="btn btn-default"><h1>登入</h1></button>';
            registerHtml += '</div>';
            registerHtml += '<div class="registerDiv col-sm-6">';
            registerHtml += '<button id="registerBtn" class="btn btn-primary"><h1>註冊</h1></button>';
            registerHtml += '</div>';

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

});
