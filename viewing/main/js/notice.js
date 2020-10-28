$(document).ready(function(){

	let noticeBtn = $('.notice_title');


	noticeBtn.click(function(){

		// 공지사항 클릭시 해당 위치로 이동(scrollTop값과 noticeLiTop의 값을 일치 시키면 화면이 위로 올라감 -500애주면 조금 내려와서 시선에 맞음)
		noticeLiTop = $(this).offset().top;
		$('html, body').animate({scrollTop : noticeLiTop-500}, 400);

		// 공지사항 클릭시 열림모션 및 체크
		let isOpen = $(this).next().is(':visible');

		noticeBtn.removeClass('on');
		noticeBtn.children('i').addClass('fa-chevron-down');
		noticeBtn.children('i').removeClass('fa-minus');
		noticeBtn.next().slideUp();

		if(isOpen) {
			$(this).removeClass('on');
			$(this).children('i').addClass('fa-chevron-down');
			$(this).children('i').removeClass('fa-minus');
			$(this).next().slideUp(100);
		}else {
			$(this).addClass('on');
			$(this).children('i').removeClass('fa-chevron-down');
			$(this).children('i').addClass('fa-minus');
			$(this).next().slideDown(200);
		}

	});
});
