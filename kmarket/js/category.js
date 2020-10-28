$(function(){
    var gnb = $('aside.left > .category > li');
  
    gnb.hover(function(){
      $(this).find('> a').addClass('on');
      $(this).find('> ol').show();
    }, function(){
      $(this).find('> a').removeClass('on');
      $(this).find('> ol').hide();
    });
  });
  