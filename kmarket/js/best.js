$(document).ready(function(){

    var best = $(".best").offset().top;

    $(window).scroll(function() {
        var window = $(this).scrollTop();

        if(best <= window) {
        $(".best").addClass("fixed");
        } else {
        $(".best").removeClass("fixed");
        }
    })

});