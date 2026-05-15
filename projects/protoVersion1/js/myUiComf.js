/**
 * Created by wayne on 2017/03/14.
 */
$(function(){
    var nu = -1;

    setInterval(function(){
        if( nu == 13 ){
            nu = 0;
        }else{
            nu ++;
        }
        var ans = $('.man').hasClass('hide');
        if(ans){
            $('.man').removeClass('hide');
        }else{
            $('.man').removeClass('animated slideOutRight');
        }
        $('.man').addClass('animated lightSpeedIn');
    }, 6000);

    setInterval(function(){
        $('.talkBubble').empty();
        $('.talkBubble').append('<h5>' + talkWords[nu] + '</h5>');
    }, 6000);

    setInterval(function(){
        $('.man').removeClass('animated lightSpeedIn');
        $('.man').addClass('animated slideOutRight');
    }, 16000);

    var talkWords = [
        '= =...',
        '沒辦法，這是工作呀！我也不想看到您。',
        '看到我很煩是吧！',
        '我也很煩！',
        '但您還是填完資料要做確認動作呀！',
        '快點！快點！',
        '這頁看完我就下班了！',
        '嗚嗚嗚...',
        '我會想您的！',
        '有空再幫我介紹客戶！',
        '記得！',
        'ㄟ＠Ｏ＠ㄟ',
        '下班！收工！'
    ];

    $(document).on('click', '#goingToPay', function(){
        $.mobile.loading('show');
        $('#insuraInfo').addClass('animated slideOutRight');
        $('#payCharge').removeClass('hide');
        $('#payCharge').addClass('animated rotateInDownLeft');
        $('#talkingOwl').empty();
        $.mobile.loading('hide');
    });

    $(document).on('click', '#PayGo', function(){
        $.mobile.loading('show');
        $('#payCharge').addClass('animated slideOutRight');
        setTimeout(function(){
            window.location = './appreciation.html';
        }, 100);
        $.mobile.loading('hide');
    })



});