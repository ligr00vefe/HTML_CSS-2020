$(function(){

    $(window).scroll(function(){
      var t = $(this).scrollTop();
      if(t > 200){
          $('#top').fadeIn(500);
      }else{
          $('#top').fadeOut(500);
      }
  
    });
  
    $('#top').click(function(){
      $('html, body').animate({'scrollTop': '0px'}, 500);
    });
  
  });
  