$(function() {

    $(document).on('scroll', function(){
            if($(document).scrollTop() > 0){
                $('.secondPageNav').slideUp();
                $('.timeLine-wrap').css({
                    "top" : "0px"
                });
            }else{
                $('secondPageNav').slideDown();
                $('.timeLine-wrap').css({
                    "top" : "52px"
                });
            }

            if($(document).scrollTop() > 20){
                $('.navbar-default').css({
                    "background-color" : "grey",
                });
            }else{
                $('.navbar-default').css({
                    "background-color" : "transparent"
                });
            }
    });
   

    
    // $(document).on('click', '#inputEx', function(){
    //     alert('hi');
    //     var i = $("#datetimepicker").find("input").val();
    //     console.log(i);
    // })
});