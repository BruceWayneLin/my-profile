/**
 * Created by wayne on 2017/03/14.
 */
$(function(){
    var nu = 0;

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
        '我等你好久了！',
        '這麼慢才來填車資料！',
        '看到我很煩是吧！',
        '我也很煩！',
        '填完就看不見我啦！',
        '所以快點填呀',
        '你睡著了喔',
        '好無聊喔！？',
        '我在等你填！',
        '別這樣看這我！',
        '我只是個翻譯，也要吃飯的！',
        '快點！快點！我要下班',
        'ㄟ...'
    ];

    $(document).on('click', '#toSeeInfoNext', function(){
        $.mobile.loading('show');
        $('#vehiFormDiv').addClass('animated slideOutRight');
        setTimeout(function(){
            window.location = './comfirmation.html';
        }, 100);
        $.mobile.loading('hide');
    })

});