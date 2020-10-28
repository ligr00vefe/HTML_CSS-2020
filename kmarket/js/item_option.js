$(document).ready(function(){

    // item option            
    var option_btn  = $('#sub > .view .info > .summary .option button');
    var option_list = $('#sub > .view .info > .summary .option ul > li > a');
    var option_category = $('#sub > .view .info > .summary .option > div:visible');
    var options = new Array();
    var option_titles = new Array();
    var option_count = option_category.length;

    option_category.each(function(i){
        var category = $(this).attr('class').substring(4);
        options[i] = category;
    });

    var items = $('#sub > .view .info > .summary .items > ul');
    var option_txt_model;
    var option_txt_color;
    var option_txt_size;


    option_btn.click(function(){
        var option_area = $(this).parent();

        var l = option_area.position().left;
        var t = option_area.position().top;

        if(option_area.hasClass('on')) {
            option_area.removeClass('on');
        }else{
            option_area.addClass('on');
        }
    });

    option_list.click(function(e){
        e.preventDefault();
        var className = $(this).parent().parent().attr('class');
        var txt = $(this).text();
        var parent = $(this).parent().parent().parent();
        var option_title = parent.find('.txt').text();
            parent.find('.txt').text(txt);
            parent.css('position', 'static');
            parent.removeClass('on');

        for(var i=0 ; i<options.length ; i++ ){
            if(options[i] == className){
                option_titles[i] = option_title;
                options[i] = txt;
                option_count--;
            }
        }

        if(option_count == 0){

            var option_full_txt = '';

            for(var i=0 ; i<options.length ; i++ ){
                if(i == options.length-1){
                    option_full_txt += options[i];
                }else{
                    option_full_txt += options[i]+' / ';
                }
            }

            var item  = '<li>';
            item += '<div class="title">';

            item += '<p>'+option_full_txt+'</p>';

            item += '<button class="close">X</button>';
            item += '</div>';
            item += '<div class="price">';
            item += '<span>';
            item += '<button class="decrease">-</button>';
            item += '<input type="text" class="num" value="1"/>';
            item += '<button class="increase">+</button>';
            item += '</span>';
            item += '<ins>27,000</ins>';
            item += '</div>';
            item += '</li>';

            items.append(item);

            //alert(option_titles);
            option_count = option_category.length;
            option_category.each(function(i){
                var category = $(this).attr('class').substring(4);
                options[i] = category;

                $(this).find('.txt').text(option_titles[i]);
            });

            var price = $('#sub > .view .info > .summary .items .price ins');
            var total_price = $('#sub > .view .info > .summary .total > span');
            var sum = 0;
            price.each(function(){
                var p = parseInt($(this).text().replace(',', ''));
                sum += p;
                total_price.text(sum.toLocaleString());
            });
        }
    });

    var closeBtn = '#sub > .view .info > .summary .items .title > button';
    var decrease = '#sub > .view .info > .summary .items .price .decrease';
    var increase = '#sub > .view .info > .summary .items .price .increase';
    var input = $('#sub > .view .info > .summary .items .price input');
    var total_price = $('#sub > .view .info > .summary .total > span');
    var price_per_item = $('#sub > .view .info > .summary .dis_price > ins').text();
    var price_no_comma = price_per_item.replace(',', '');


    total_price.text(0);

    $(document).on('click', closeBtn, function(){
        $(this).parent().parent().remove();

            var price = $('#sub > .view .info > .summary .items .price ins');
            var sum = 0;

        if(price.length == 0){
            total_price.text(0);
        }

        price.each(function(i){
            var p = parseInt($(this).text().replace(',', ''));
            sum += p;
            total_price.text(sum.toLocaleString());
        });
    });

    $(document).on('click', increase, function(){
        calcPrice($(this), 'increase');
    });
    $(document).on('click', decrease, function(){
        calcPrice($(this), 'decrease');
    });

    function calcPrice( tg, op ){
        var price = $('#sub > .view .info > .summary .items .price ins');
        var span = tg.parent();
        var num = span.find('>.num').val();

        if(op == 'increase'){
            num = ++num;
        }else if(op == 'decrease'){
            num = --num;
        }

        span.find('>.num').val(num);

        var total = num*parseInt(price_no_comma);
        span.parent().find('>ins').text(total.toLocaleString());

        var sum = 0;
        price.each(function(){
            var p = parseInt($(this).text().replace(',', ''));
            sum += p;
            total_price.text(sum.toLocaleString());
        });
    }

});