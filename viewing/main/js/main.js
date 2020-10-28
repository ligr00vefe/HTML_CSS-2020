'use strict';

$(document).ready(function(){

    let isMain = $(document).find('#main');

    // alert(isMain);

    if(isMain) {

        // 변수선언
        let $headerNav = $('header > nav');

        $(window).scroll(function(){

            let $winScrollTop = $(this).scrollTop();

            // console.log("scrollTop : " + $winScrollTop);

            if ($winScrollTop > 0) {
                $headerNav.css('backgroundColor', '#191919');
            } else {
                $headerNav.css('backgroundColor', 'transparent');
            }
        });
    }

    // 검색창 고정
    let $main = $('main'),
        $searchBtn = $('.search_btn'),
        $searchBar = $('.search_bar');

    $searchBtn.click(function() {
        $searchBar.addClass('search');
        $searchBar.children('input').focus();
    }).focusin(function() {
        $searchBar.addClass('search');
    })
    $main.click(function(){
        $searchBar.removeClass('search');
    });

    // 슬라이드 배너 변수
    let $slideContainer = $('.slide_container'),
		$sliderCount = $('.slide_container > div').length,
		$currentIndex = 0;

    // 인디케이터 변수
    let $indicator = $('.indicator'),
		$indicatorLi = $('.indicator > li'),
		$indicatorCount = $('.indicator > li').length;

    // 슬라이드 배너 함수 선언
    function bannerPrev() {
        if($currentIndex <= 0) {
            $('.banner_prev').css('display', 'none');
            $currentIndex == 0;
        }else {
            $('.banner_prev').css('display', 'block');
        }

        $currentIndex--;
        $slideContainer.children().eq($currentIndex).siblings().fadeOut(100);
        $slideContainer.children().eq($currentIndex).fadeIn(350);
    };
    function bannerNext() {
        if($currentIndex >= $sliderCount) {
            $('.banner_next').css('display', 'none');
            $currentIndex == $sliderCount;
        }else {
            $('.banner_next').css('display', 'block');
        }

        $currentIndex++;
        $slideContainer.children().eq($currentIndex).siblings().fadeOut(100);
        $slideContainer.children().eq($currentIndex).fadeIn(350);
    };
     function indicatorMove() {
		$slideContainer.children().eq($currentIndex).siblings().stop().fadeOut(100);
        $slideContainer.children().eq($currentIndex).stop().fadeIn(350);
        $indicator.children().eq($currentIndex).siblings().removeClass('on');
        $indicator.children().eq($currentIndex).addClass('on');
    };
    function sliderMove() {
        $slideContainer.children().eq($currentIndex).siblings().stop().fadeOut(100);
        $slideContainer.children().eq($currentIndex).stop().fadeIn(350);
    }

    // prev, next 함수 실행
    $('.banner_prev').click(function(){
        bannerPrev();
    });
    $('.banner_next').click(function(){
        bannerNext();
    });

    // 인디케이터 함수 실행
    $indicator.children('li').click(function(){
        $currentIndex = $(this).index();

        indicatorMove();
        sliderMove();
    });

    // 슬라이드 배너 함수 실행
    setInterval(function(){
        $currentIndex = $currentIndex % $sliderCount;

        sliderMove();

        indicatorMove();

        $currentIndex++;

//        console.log("$currentIndex : " + $currentIndex);
//        console.log("sliderCount : " + sliderCount);
    }, 30000);



    // 팝업창
    $('#buy_button').click(function(){
        $('#buy_pop_up').stop().fadeIn(100);
    });
    $('.buy_close').click(function(){
        $('#buy_pop_up').stop().fadeOut(10);
    });

    // 서비스 시작 버튼
    $('#start_button').mouseenter(function(){
        $(this).css('background-color', '#005dea');
    });
    $('#start_button').mouseleave(function(){
        $(this).css('background-color', '#00deea');
    });


    // 리스트
    // 썸네일 변수 선언
    let $thumbContainer = $('.list_thumb_container'),
        $listThumb = $('.list_thumb_container > li'),
		$listThumbOl = $('.list_thumb > ol');

    // 썸네일 함수 선언


    // 썸네일 함수 실행
    $listThumbOl.mouseenter(function(){

        var $listThumbIndex = $(this).parent().index(),
            $liMoveTime = 300,
            $easing = 'ease-in-out';

			if($listThumbIndex == 0) {

				  $(this).parent().nextAll().stop().animate({'left': '4.3%'}, $liMoveTime);
				  $(this).parent().stop().animate({'left': '2.2%'}, $liMoveTime);
			}else if ($listThumbIndex == 4) {
				  $(this).parent().prevAll().stop().animate({'left': '-4.3%'}, $liMoveTime);
				  $(this).parent().stop().animate({'left': '-2.2%'}, $liMoveTime);
			}else {
				  $(this).parent().nextAll().stop().animate({'left': '2.1%'}, $liMoveTime);
				  $(this).parent().prevAll().stop().animate({'left': '-2.1%'}, $liMoveTime);
			}

			$(this).addClass('visible');
			$(this).parent().children('span').stop().animate({'opacity': 0}, 500);
    });
    $listThumbOl.mouseleave(function(){

        $(this).parent().nextAll().stop().animate({'left': 0}, 0);
        $(this).parent().prevAll().stop().animate({'left': 0}, 0);
        $(this).parent().stop().animate({'left': 0}, 0);
        $(this).parent().children('span').delay(300).stop().animate({'opacity': 1}, 0);
		$(this).removeClass('visible');
    });

    // 2depth 즐겨찾기 버튼
    let $bookmarkCheck = $('.bookmark_check');

    $bookmarkCheck.mouseenter(function(){
        $(this).stop().animate({'opacity': 1}, 0).prev('i').stop().animate({'opacity': 0}, 0);
    }).mouseleave(function(){
        $(this).stop().animate({'opacity': 0}).prev('i').stop().animate({'opacity': 1}, 100);
    });

    $bookmarkCheck.click(function(){
        $(this).toggleClass('on');
    });

    // 3depth 컨텐츠
    let $thirdDownBtn = $('.third_down_btn'),
        $thirdCloseBtn = $('.third_close_btn');

    $thirdDownBtn.click(function(e){
        e.preventDefault();

        let $thisList = $(this).parents('ul').parent();

        $thisList.children('.third_contents').addClass('show');
    });

    $thirdCloseBtn.click(function(e){
        e.preventDefault();

        $(this).parents('.third_contents').removeClass('show');
    });

    // 뷰
    let $playBtn = $('.play_btn'),
        $videoClose = $('.view_close');

    $playBtn.click(function() {
        $('#view').css('display', 'block');
        $('#main, header, footer').css('display', 'none');
    });

    $videoClose.click(function() {
        $('#view').css('display', 'none');
        $('#main, header, footer').css('display', 'block');
    });

    // 평가하기 페이지 별점
    let $sizeBox = $('.size_box'),
        timer = 10;

    $(".color_stars").mousemove(function(e){
         let x1 = e.pageX - this.offsetLeft;

        // console.log(x);

        if(x1 >= 0 && x1 < 135) {
            $sizeBox.stop().animate({'width': '29px'}, timer);
        }else if(x1 > 136 && x1 < 155) {
            $sizeBox.stop().animate({'width': '50px'}, timer);
        }else if(x1 > 165 && x1 < 183) {
            $sizeBox.stop().animate({'width': '77px'}, timer);
        }else if(x1 > 184 && x1 < 204) {
            $sizeBox.stop().animate({'width': '100px'}, timer);
        }else if(x1 > 212 && x1 < 232) {
            $sizeBox.stop().animate({'width': '125px'}, timer);
        }else if(x1 > 233 && x1 < 251) {
            $sizeBox.stop().animate({'width': '150px'}, timer);
        }else if(x1 > 260 && x1 < 279) {
            $sizeBox.stop().animate({'width': '173px'}, timer);
        }else if(x1 > 280 && x1 < 300) {
            $sizeBox.stop().animate({'width': '200px'}, timer);
        }else if(x1 > 308 && x1 < 327) {
            $sizeBox.stop().animate({'width': '220px'}, timer);
        }else if(x1 > 328 && x1 < 346) {
            $sizeBox.stop().animate({'width': '100%'}, timer);
        }

    }).click(function(e){
        let x2 = e.pageX - this.offsetLeft;
        return x2;
        // alert(x);

        if(x2 >= 0 && x2 < 135) {
            $sizeBox.stop().animate({'width': '29px'}, timer);
        }else if(x2 > 136 && x2 < 155) {
            $sizeBox.stop().animate({'width': '50px'}, timer);
        }else if(x2 > 165 && x2 < 183) {
            $sizeBox.stop().animate({'width': '77px'}, timer);
        }else if(x2 > 184 && x2 < 204) {
            $sizeBox.stop().animate({'width': '100px'}, timer);
        }else if(x2 > 212 && x2 < 232) {
            $sizeBox.stop().animate({'width': '125px'}, timer);
        }else if(x2 > 233 && x2 < 251) {
            $sizeBox.stop().animate({'width': '150px'}, timer);
        }else if(x2 > 260 && x2 < 279) {
            $sizeBox.stop().animate({'width': '173px'}, timer);
        }else if(x2 > 280 && x2 < 300) {
            $sizeBox.stop().animate({'width': '200px'}, timer);
        }else if(x2 > 308 && x2 < 327) {
            $sizeBox.stop().animate({'width': '220px'}, timer);
        }else if(x2 > 328 && x2 < 346) {
            $sizeBox.stop().animate({'width': '100%'}, timer);
        }

    }).mouseleave(function(x2) {

        alert(x2.offsetX);

        let x3 = x2.offsetX;
        // alert(x3.offsetX);

        if(x3 >= 0 && x3 < 135) {
            $sizeBox.stop().animate({'width': '29px'}, timer);
        }else if(x3 > 136 && x3 < 155) {
            $sizeBox.stop().animate({'width': '50px'}, timer);
        }else if(x3 > 165 && x3 < 183) {
            $sizeBox.stop().animate({'width': '77px'}, timer);
        }else if(x3 > 184 && x3 < 204) {
            $sizeBox.stop().animate({'width': '100px'}, timer);
        }else if(x3 > 212 && x3 < 232) {
            $sizeBox.stop().animate({'width': '125px'}, timer);
        }else if(x3 > 233 && x3 < 251) {
            $sizeBox.stop().animate({'width': '150px'}, timer);
        }else if(x3 > 260 && x3 < 279) {
            $sizeBox.stop().animate({'width': '173px'}, timer);
        }else if(x3 > 280 && x3 < 300) {
            $sizeBox.stop().animate({'width': '200px'}, timer);
        }else if(x3 > 308 && x3 < 327) {
            $sizeBox.stop().animate({'width': '220px'}, timer);
        }else if(x3 > 328 && x3 < 346) {
            $sizeBox.stop().animate({'width': '100%'}, timer);
        }
    })

});
