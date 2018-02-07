$.fn.czg_lunbotu = function(option){
	let can = $.extend({
					box:null,//总框架
					pic:null,//大图框架
					pnum:null,//小图框架
					prev_btn:null,//小图左箭头
					next_btn:null,//小图右箭头
					prev:null,//大图左箭头
					next:null,//大图右箭头
					autoplay:false,//是否自动播放
					interTime:500,//图片自动切换间隔
					delayTime:800,//切换一张图片时间
					order:0,//当前显示的图片（从0开始）
					picdire:true,//大图滚动方向（true水平方向滚动）
					mindire:true,//小图滚动方向（true水平方向滚动）
					min_picnum:null,//小图显示数量
				}, option || {});
	let picnum = $(can.pic).find('ul li').length;
	let picw = $(can.pic).find('ul li').outerWidth(true);
	let pich = $(can.pic).find('ul li').outerHeight(true);
	let poppicw = $(can.pop_pic).find('ul li').outerWidth(true);
	let picminnum = $(can.pnum).find('ul li').length;
	let picpopnum = $(can.pop_pic).find('ul li').length;
	let picminw = $(can.pnum).find('ul li').outerWidth(true);
	let picminh = $(can.pnum).find('ul li').outerHeight(true);
	let pictime;
	let tpqhnum=0;
	let xtqhnum=0;
	$(can.pic).find('ul').width(picnum*picw).height(picnum*pich);
	$(can.pnum).find('ul').width(picminnum*picminw).height(picminnum*picminh);
	$(can.pop_pic).find('ul').width(picpopnum*poppicw);
	    $(can.pnum).find('li').click(function () {
        	tpqhnum = $(can.pnum).find('li').index($(this));
            xtqhnum = tpqhnum;
        show(tpqhnum);
		minshow(xtqhnum);
    }).eq(can.order).trigger("click");
	if(can.autoplay==true){
		pictime = setInterval(function(){
			show(tpqhnum);
			minshow(tpqhnum);
			tpqhnum++;
			xtqhnum++;
			if(tpqhnum==picnum){tpqhnum=0};	
			if(xtqhnum==picminnum){xtqhnum=0};
					
		},can.interTime);
		$(can.box).hover(function(){
			clearInterval(pictime);
		},function(){
			pictime = setInterval(function(){
				show(tpqhnum);
				minshow(tpqhnum);
				tpqhnum++;
				xtqhnum++;
				if(tpqhnum==picnum){tpqhnum=0};	
				if(xtqhnum==picminnum){xtqhnum=0};		
				},can.interTime);			
			});
	}
	$(can.prev_btn).click(function(){
		if(tpqhnum==0){tpqhnum=picnum};
		if(xtqhnum==0){xtqhnum=picnum};
		xtqhnum--;
		tpqhnum--;
		show(tpqhnum);
		minshow(xtqhnum);	
		});
	$(can.next_btn).click(function(){
		if(tpqhnum==picnum-1){tpqhnum=-1};
		if(xtqhnum==picminnum-1){xtqhnum=-1};
		xtqhnum++;
		minshow(xtqhnum);
		tpqhnum++;
		show(tpqhnum);
		});
	$(can.prev).click(function(){
		if(tpqhnum==0){tpqhnum=picnum};
		if(xtqhnum==0){xtqhnum=picnum};
		xtqhnum--;
		tpqhnum--;
		show(tpqhnum);
		minshow(xtqhnum);	
		});
	$(can.next).click(function(){
		if(tpqhnum==picnum-1){tpqhnum=-1};
		if(xtqhnum==picminnum-1){xtqhnum=-1};
		xtqhnum++;
		minshow(xtqhnum)
		tpqhnum++;
		show(tpqhnum);
		});
	function minshow(xtqhnum){
		let mingdjl_num =xtqhnum-can.min_picnum+2;
		let mingdjl_w=-mingdjl_num*picminw;
		let mingdjl_h=-mingdjl_num*picminh;
		if(can.mindire==true){
			$(can.pnum).find('ul li').css('float','left');
			if(picminnum>can.min_picnum){
				if(xtqhnum<3){mingdjl_w=0;}
				if(xtqhnum==picminnum-1){mingdjl_w=-(mingdjl_num-1)*picminw;}
				$(can.pnum).find('ul').stop().animate({'left':mingdjl_w},can.delayTime);
				}
		}else{
			$(can.pnum).find('ul li').css('float','none');
			if(picminnum>can.min_picnum){
				if(xtqhnum<3){mingdjl_h=0;}
				if(xtqhnum==picminnum-1){mingdjl_h=-(mingdjl_num-1)*picminh;}
				$(can.pnum).find('ul').stop().animate({'top':mingdjl_h},can.delayTime);
				}
			}
	}
		function show(tpqhnum){
			let gdjl_w=-tpqhnum*picw;
			let gdjl_h=-tpqhnum*pich;
			if(can.picdire==true){
				$(can.pic).find('ul li').css('float','left');
				$(can.pic).find('ul').stop().animate({'left':gdjl_w},can.delayTime);
				}else{
			$(can.pic).find('ul').stop().animate({'top':gdjl_h},can.delayTime);
			}
			$(can.pnum).find('li').eq(tpqhnum).addClass("on").siblings(this).removeClass("on");
		}
};
$(function(){
    $('#demo1').czg_lunbotu({
        box:"#demo1",//总框架
        pic:"#ban_pic1",//大图框架
        pnum:"#ban_num1",//小图框架
        prev_btn:"#prev_btn1",//小图左箭头
        next_btn:"#next_btn1",//小图右箭头
        prev:"#prev1",//大图左箭头
        next:"#next1",//大图右箭头
        autoplay:true,//是否自动播放
        interTime:5000,//图片自动切换间隔
        delayTime:400,//切换一张图片时间
        order:0,//当前显示的图片（从0开始）
        picdire:true,//大图滚动方向（true为水平方向滚动）
        mindire:true,//小图滚动方向（true为水平方向滚动）
        min_picnum:5,//小图显示数量
    })
});

