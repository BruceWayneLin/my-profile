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
    }, 4000);

    setInterval(function(){

        $('.talkBubble').empty();
        $('.talkBubble').append('<h5>' + talkWords[nu] + '</h5>');
    }, 4300);

    setInterval(function(){
        $('.man').removeClass('animated lightSpeedIn');
        $('.man').addClass('animated slideOutRight');
    }, 10000);

    var talkWords = [
        'HI!加油～！',
        '我又來嚕！',
        '你又看見我嚕！',
        '覺得我煩嗎！？',
        'bye bye',
        'what up Nigga',
        '還沒填完！？',
        '你好笨喔！',
        '快結束了！',
        '我要走了',
        '貓頭鷹萬歲',
        '快點！我要下班',
        '詞窮...'
    ];

    $(document).on('click', '#toGoNext', function(){
        $.mobile.loading('show');
        $('#registerFormDiv').addClass('animated slideOutRight');
        setTimeout(function(){
            window.location = './vehicleForm.html';
        }, 200);
        $.mobile.loading('hide');
    })

});