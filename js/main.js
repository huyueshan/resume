$(function(){
    //顶部链接hover事件
    $("#headerPara a[href='#contact']").hover(
        function() {
            $('#contactAnim .levelOne').stop(false, true).animate({
                'opacity': 'show',
                'bottom': '40%'
            }, 300 )
        },
        function() {
            $('#contactAnim .levelOne').stop(false, true).animate({
                'opacity': 'hide',
                'bottom': '-50%'
            }, 300 )
        }

    );
    $("#headerPara a[href='#works']").hover(
        function() {
            $('#blogAnim .levelOne').stop(false, true).animate({
                'opacity': 'show',
                'bottom': '50%'
            }, 500 )
        },
        function() {
            $('#blogAnim .levelOne').stop(false, true).animate({
                'opacity': 'hide',
                'bottom': '-80%'
            }, 500 )
        }
    );
    $("#headerPara a[href='#jineng']").hover(
        function() {
            $('#workAnim .levelOne').stop(false, true).animate({
                'opacity': 'show',
                'bottom': '50%',
                'width': '100%',
                'left': '0'
            }, 500 )
        },
        function() {
            $('#workAnim .levelOne').stop(false, true).animate({
                'opacity': 'hide',
                'bottom': '0',
                'width': '10%',
                'left': '45%'
            }, 500 )
        }
    );
    $("#headerPara a[href='#about']").hover(
        function() {
            $('#aboutAnim .levelOne').stop(false, true).animate({
                'opacity': 'show',
                'bottom': '-5%'
            }, 300, 'linear').stop(false, true).animate({
                'bottom': '-10%'
            }, 150).stop(false, true).animate({
                'bottom': '-7%'
            }, 50 )
        },
        function() {
            $('#aboutAnim .levelOne').stop(false, true).animate({
                'bottom': '-10%'
            }, 50).stop(false, true).animate({
                'bottom': '-5%'
            }, 150).stop(false, true).animate({
                'opacity': 'hide',
                'bottom': '-50%'
            }, 300 )
        }
    );

    //技能展示调用
    $('#gellery').czg_transformer({
        Effects:new Array('Optimus','Ironhide','Scorponok','Megatron','Starscream','Jazz'),
        Columns:7,
        Rows:3,
        Speed:6000,
        TitleHeight:160,
        TitleWidth:0,
    });


    $("#chajian_top_tab").on("click","ul li",function(){
        $(this).addClass("click-tab").siblings().removeClass("click-tab");
    });
    $("#chajian_top_tab ul li:eq(4)").trigger("click");
    $("#chajian_top_tab ul li").hover(function(){
        $(this).addClass("hover-tab");
    },function(){
        $(this).removeClass("hover-tab");
    });
    $("#resume_wrap div").hover(function(){
        $(this).css("z-index","5").addClass("box_scale").siblings().css("z-index","3")
    },function(){
        $(this).removeClass("box_scale");
    });

    //game
    // window.addEventListener('load',initial,false);

//返回顶部事件
    $(document).scroll(function(){
        var top=$(document).scrollTop();
        if(top<500){
            $('#totop').hide();
        }
        else{
            $('#totop').show();
        }
    });
    $("#totop").hover(function(){
        $(this).css("background-color","rgba(250,250,250,.9)");
    },function(){
        $(this).css("background-color","rgba(156,160,176,.3)");
    })

});


//表单提交
function formInfo(element,str,top,left){
    let infobox=$("#info-box");
        element.val("").focus();
        infobox.html(str).css({top:top,left:left}).show();
        setTimeout(function(){
            infobox.html("").hide();
        },1000);
}

$("#contact-form #submitbtn").click(function(){
    let username=$("#username");
    let commentContent=$("#commentContent");
    if(!$.trim(commentContent.val())){
        formInfo(commentContent,"请输入留言内容！","100px","40px");
        return false;
    }
    if(!$.trim(username.val())){
        formInfo(username,"请输入昵称！","138px","420px");
        return false;
    }

    //提交开始
    $("#mask-loading").show().siblings().hide();
    let data= $("#contact-form").serialize();
    $.ajax( {
        type : "POST",
        url : "http://chenzhenguo.site/comment/save",
        data : data,
        success : function(msg) {
            $("#mask-success").show().siblings().hide();
            setTimeout(function(){
                $("#mask-success").hide();
            },1000);

        },
        error: function(data) {
            $("#mask-erro").show().siblings().hide();
            setTimeout(function(){
                $("#mask-erro").hide();
            },1000);
        }
    });
    return false
});

