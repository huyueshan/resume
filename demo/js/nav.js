let d = document;
let l = window.location.href;
let f = l.substring(l.lastIndexOf('/') + 1);
let timer = false;
let flash_params = {
    wmode: 'opaque',
    menu: false,
    allowFullscreen: "true",
    scale: 'Scale'
};
let flashvars = {};

let lang = window.location.href.match(/\.com\/([a-z]{2})\//);
if (lang && lang.length && lang.length > 1 && lang[1] != '') 
    lang = lang[1];
else 
    lang = 'en';
$(document).ready(function(){
 autoMaxWidth.ini();
});
$(window).load(function(){
	 autoMaxWidth.ini();
    lightbox.ini();
    menuPopup.ini();
    menuHighlight.exec();
    $(window).resize(function(){
        if (typeof indexSlides != 'undefined' && indexSlides.reformat) 
            indexSlides.reformat();
        autoMaxWidth.ini();
    });
    let map_flashvars = {
        Area1: 'Asia Pacific',
        Area2: 'Commonwealth of Independent States',
        Area3: 'Europe',
        Area4: 'Latin America',
        Area5: 'Middle East North Africa',
        Area6: 'North America',
        Area7: 'South Africa',
        Path1: 'mailto:test@gmail.com',
        Path2: 'GotoUrlPath2.html',
        Path3: 'GotoUrlPath3.html',
        Path4: 'GotoUrlPath4.html',
        Path5: 'GotoUrlPath5.html',
        Path6: 'GotoUrlPath6.html',
        Path7: 'GotoUrlPath7.html'
    };
});

let menuHighlight = {};
menuHighlight.exec = function(){
    if (l.indexOf('solutions') > -1) {
        $('#menu .solutions a').addClass('active');
        return $('#menu').data("normal", "solutions");
    }
    if (l.indexOf('products') > -1) {
        $('#menu .products a').addClass('active');
        return $('#menu').data("normal", "products");
    }
    if (l.indexOf('services') > -1) {
        $('#menu .services a').addClass('active');
        return $('#menu').data("normal", "services");
    }
    if (l.indexOf('about-huawei') > -1) {
        $('#menu .about-huawei a').addClass('active');
        return $('#menu').data("normal", "about-huawei");
    }
};
let mouse_events = {};
$(document).ready(function(){
	if(!iPx()){
		mouse_events.mouse_over();
		mouse_events.mouse_out();
	}
});

let timeout;
mouse_events.mouse_over = function(){
	$("#menu li").mouseover(function(){
		dateIn = new Date();
		timeIn = dateIn.getTime();
		timeOut = 0;
		flag = true;	
		let p = this.className;
		timeout = setTimeout(function(){mouse_events.aShow(p)}, 500);
	});
};
mouse_events.mouse_out = function(){
	$("#menu li").mouseout(function(){									
		dateOut = new Date();
		timeOut = dateOut.getTime();
		timeIn = 0;
		flag = false;	
		
		if (divShow_flag != true) {
			$("#menu li a").removeClass('hover');
		}
		clearTimeout(timeout);
		clearTimeout(time_temp);
	});
};
mouse_events.aShow = function(classname){
	$('#menu .'+classname+' a').addClass('hover');
};
let dateOut;
let timeOut;
let dateIn
let timeIn;
let flag = false;
let divShow_flag = false;
let $target;
let target;
let css;
let time_temp;

function showDiv() {
	if (flag = true && timeIn > 0) {
		$target = menuPopup.obj.css(css).find('.' + target).show();
	}
	flag = false;
}
let menuPopup = {};
menuPopup.timer = false;
menuPopup.ini = function(){
    menuPopup.obj = $('#menu-popup');
    $('#menu li a').hover(function(){
        menuPopup.stop();
        $('#menu li a').removeClass('active');
        $('#menu li a').removeClass('hover');
        menuPopup.obj.find('.popup').hide();
        target = this.parentNode.className;
        let position = $(this).offset();
        let shadowOffset = 2;
       	css = {
            top: position.top + 30,
            left: $('#menu li a').eq(0).offset().left - shadowOffset
        };
        if(iPx()){
        
        	let $target = menuPopup.obj.css(css).find('.' + target).show();
         					
			if ($target.length > 0) 
			$(this).addClass('hover');
			
		}else{
			if (flag = true) {
				time_temp = setTimeout(showDiv, 500);		
			}
		}
        if ($(this).parent().attr('class') != $('#menu').data("normal")) {
            menuHighlight.exec();
        }
    }, menuPopup.hide);
    menuPopup.obj.hover(menuPopup.stop, menuPopup.hide);
};
menuPopup.stop = function(){
	divShow_flag = true;
    if (menuPopup.timer)
        clearTimeout(menuPopup.timer);
};
menuPopup.hide = function(){
    menuPopup.stop();
    menuPopup.timer = setTimeout(function(){
        menuPopup.obj.css('top', '-1000px');
        $('#menu a').removeClass('hover');
        menuHighlight.exec();
    }, 10);
};
let autoMaxWidth = {};
autoMaxWidth.ini = function(){
    let winW = $(window).width();
    if (winW < 980) 
        winW = 980;
    $('.autoMaxWidth').each(function(){
        $(this).width(winW);
        let $img = $('img', this).first();
        let imgW = $img.width();
        let left = (winW - imgW) / 2;
        $img.css({ "left": left + "px", "position": "relative" });
    });
};
jQuery.fn.center = function(){
    let top = ($(window).height() - this.height()) / 2 + $(window).scrollTop();
    let left = ($(window).width() - this.width()) / 2 + $(window).scrollLeft();
    this.css("position", "absolute");
    this.css("top", top + "px");
    this.css("left", left + "px");
    return this;
};
jQuery.fn.calCenter = function(minW){
    let winW = $(window).width();
    if (minW && winW < minW) 
        winW = minW;
    let left = (winW - this.width()) / 2 + $(window).scrollLeft();
    return {
        'left': left
    };
};
jQuery.fn.cleanOuterHTML = function(){
    return $("<p/>").append(this.eq(0).clone()).html();
};
jQuery.fn.loadthumb = function(options) {
	options = $.extend({
		 src : ""
	},options);
	let _self = this;
	_self.hide();
	let img = new Image();
	$(img).load(function(){
		_self.attr("src", options.src);
		_self.fadeIn("slow");
	}).attr("src", options.src);
	return _self;
};
let lightbox = {};
lightbox.status = 0;
lightbox.contentId = false;
lightbox.selector = 'a[rel=lightbox]';
lightbox.width = 706;
lightbox.height = 560;
lightbox.ini = function(){
    $(lightbox.selector).click(function(e){
        e.preventDefault();
        lightbox.status = 1;
        lightbox.overlay();
        let hrefObj = this.href.substring(this.href.indexOf('#') + 1);
        let srcArray = hrefObj.split('&');
        let srcPath = srcArray[0];
        lightbox.width = srcArray[1];
        lightbox.height = srcArray[2];
        if (lightbox.width == null && lightbox.width == null) {
            let video_width = 640;
            let video_height = 400;
        }
        else {
            let video_width = lightbox.width;
            let video_height = lightbox.height;
        }
        if (this.href.indexOf('.mp4') > -1 || this.href.indexOf('.flv') > -1) {
            $('<div id="lightbox" />').appendTo('body').css({
                'width': lightbox.width,
                'height': lightbox.height,
                'z-index': 99
            }).append('<div class="videoHead"><div class="Close"></div></div>').center();
            $('#lightbox .Close').click(lightbox.close);
            $('#lightbox').append('<div class="video"><div id="lightbox_flash"/></div>');
            if (iPx()) {
                $('#lightbox_flash').append(["<video width='", video_width, "' height='", video_height, "' controls='controls'><source type='video/mp4' src='", srcPath, "'></source></video>"].join(""));
            }
            else {
                $('#lightbox .heading div').removeClass("title");
                
                $('#lightbox').css({
                    'width': parseInt(video_width) + 10,
                    'height': parseInt(video_height) + 50
                }).find('.heading').css('width', video_width);
                flashvars = {
                    srcPath: srcPath,
                    downloadPath: "",
                    imgPath: "",
                    videoW: video_width,
                    videoH: video_height,
                    autoLoop: "false",
                    controlBarAutoHide: "false",
                    autoPlay: "true"
                };
                flash_params = {
                    menu: "false",
                    scale: "Scale",
                    allowFullscreen: "true",
                    allowScriptAccess: "always",
                    bgcolor: "#FFFFFF"
                };
				let skinSrc=g_HttpRelativeWebRoot+'groups/public/documents/webasset/glow.zip';
				let swfSrc=g_HttpRelativeWebRoot+'groups/public/documents/webasset/player.swf';
                jwplayer("lightbox_flash").setup({
                width:video_width,
                height:video_height,
				skin: skinSrc,
				stretching: "exactfit",
				flashplayer: swfSrc,
				file:srcPath,
				autoStart:"true",
				plugins: {
            		gapro: { accountid: "UA-7728030-4" }
        		}
				});
            }
            $(window).resize(lightbox.relocate);

        }else if (this.href.indexOf('.swf') > -1) {
                $('<div id="lightbox" />').appendTo('body').css({
                    'width': lightbox.width,
                    'height': lightbox.height,
                    'z-index': 99
                }).append('<div class="videoHead"><div class="Close"></div></div>').center();
                $('#lightbox .Close').click(lightbox.close);
                $('#lightbox').append('<div class="video"><div id="lightbox_flash"/></div>');
                if (iPx()) {
                    window.location = srcPath;
                    lightbox.close();
                }
                else {
                    $('#lightbox .heading div').removeClass("title");
                    $('#lightbox').css({
                        'width': parseInt(video_width) + 10,
                        'height': parseInt(video_height) + 50
                    }).find('.heading').css('width', video_width);
                    flashvars = {};
                    flash_params = {
                        menu: "false",
                        scale: "Scale",
                        allowFullscreen: "true",
                        allowScriptAccess: "always",
                        bgcolor: "#FFFFFF"
                    };
  		 			 swfobject.embedSWF(srcPath, 'lightbox_flash', video_width, video_height, '9.0.0', "expressInstall.swf", flashvars, flash_params);
                }
            }
            else {
            $('<div id="lightbox" />').appendTo('body').css({
                'width': lightbox.width,
                'height': lightbox.height,
                'z-index': 99
            }).append('<div class="heading"><div class="rightBg"><div class="title"></div><div class="close"><div class="CloseIcon"></div></div></div></div>').center();
            $('#lightbox .close').click(lightbox.close);
            if (this.title)
                $('#lightbox .title').html(this.title);
            $('#lightbox').append('<div class="container" id="lightbox_content" /><div class="bottom"/>');
            if (this.href.indexOf('#') > -1) {
                let id = this.href.substring(this.href.indexOf('#') + 1);
                lightbox.contentId = id;
                let $content = $('#' + id);
                if ($content.height() > 410) {
                    $('#lightbox').width($content.width() + 4).height(460).center();
                    $content.children(".content").height(388);
                }
                else {
                    $('#lightbox').width($content.width() + 4).height($content.height() + 50).center();
                }
                $content.appendTo('#lightbox_content').show();
                $(window).unbind('scroll').resize(lightbox.relocate);
            }
        }
    });
    $(lightbox.worldwide).click(function(e){
        e.preventDefault();
        lightbox.status = 1;
        lightbox.overlay();
        let hrefObj = this.href.substring(this.href.indexOf('#') + 1);
        let srcArray = hrefObj.split('&');
        let srcPath = srcArray[0];
         lightbox.width = srcArray[1];
         lightbox.height = srcArray[2];
        $('<div id="lightbox" />').appendTo('body').css({
            'width': lightbox.width,
            'height': lightbox.height,
            'z-index': 99
        }).append('<div class="videoHead"><div class="Close"></div></div>').center();
        $('#lightbox .Close').click(lightbox.close);
        $('#lightbox').append('<div class="video"><div id="lightbox_flash"><div style="text-align:center;"><img src=g_HttpRelativeWebRoot + "groups/public/documents/webasset/hw_076709.gif" /></div></div></div>');
        $('#lightbox .heading div').removeClass("title");
        $('#lightbox').css({
            'width': parseInt(lightbox.width) + 10,
            'height': parseInt(lightbox.height) + 50
        }).find('.heading').css('width', lightbox.width);
        flashvars = {};
        lash_params = {
            menu: "false",
            scale: "noScale",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            bgcolor: "#FFFFFF"
        };
  		 swfobject.embedSWF(srcPath, 'lightbox_flash', lightbox.width, lightbox.height, '9.0.0', "expressInstall.swf", flashvars, flash_params);
        $(window).unbind('scroll').resize(lightbox.relocate);
    });
};

lightbox.open = function(id, title){
    lightbox.status = 1;
    lightbox.overlay();
    $('<div id="lightbox" />').appendTo('body').css({
        'width': lightbox.width,
        'height': lightbox.height,
        'z-index': 99
    }).append('<div class="heading"><div class="title"></div><div class="close">Close X</div></div>').center();
    $('#lightbox .close').click(lightbox.close);
    $('#lightbox .title').html(title);
    $lightbox = $('#lightbox').append('<div id="lightbox_content" />');
    lightbox.contentId = id;
    let $content = $('#' + id);
    $lightbox.width($content.width()).height($content.height() + 50).center();
    if (parseInt($lightbox.css('top')) < 0)
        $lightbox.css('top', '0px');
    $content.appendTo('#lightbox_content').show();
    if (id == 'inquiry_popup') {
        $(window).scroll(lightbox.relocateShift).resize(lightbox.relocateShift);
        lightbox.relocateShift();
    }
    else {
        $(window).unbind('scroll').resize(lightbox.relocate);
    }
    
    };
lightbox.relocate = function(){
    if (lightbox.status == 1) {
        lightbox.overlay();
        let $lightbox = $('#lightbox').center();
        if (parseInt($lightbox.css('top')) < 0) 
            $lightbox.css('top', '0px');
    }
    };
lightbox.relocateShift = function(){
    if (lightbox.status == 1) {
        lightbox.overlay();
        let top;
        if (iPx()) 
            top = $(window).scrollTop() + 30;
        else 
            top = $(window).scrollTop() + 100;
        let $lightbox = $('#lightbox').center().css('top', top);
        if (parseInt($lightbox.css('top')) < 0) 
            $lightbox.css('top', '0px');
    }
    };
lightbox.overlay = function(){
    let w_width = $(document).width();
    let w_height = $(document).height();
    $('#overlay').remove();
    $('<div id="overlay" />').appendTo('body').css({
        'width': w_width,
        'height': w_height
    }).click(lightbox.close);
    };
lightbox.close = function(){
    if (lightbox.contentId != false) {
        $('#' + lightbox.contentId).hide().appendTo('body');
        lightbox.contentId = false;
    }
    $('#overlay, #lightbox').remove();
    lightbox.status = 0;
};
function iPx(){
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) 
        return true;
    return false;
}
$(document).ready(function(){
 	$("img").removeAttr("alt"); 
}); 
flag = false;

