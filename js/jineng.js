(function($) {
    $.fn.czg_transformer = function(options) {
        let __Settings = {
            Effects: ['Optimus', 'Ironhide', 'Scorponok', 'Megatron', 'Starscream', 'Jazz'],
            Columns: 7,
            Rows: 3,
            Speed: 10000,
            TitleHeight: 150,
            TitleWidth: false,
        };
        return this.each(function() {
            if (options) {
                $.extend(__Settings, options);
            }
            let objElement = this;
            let imgSrcArray = [];
            let titleContentArray = [];
            let eventChecker = false;
            let childMaskId = 1;
            let parentId = 1;
            let childClassId = 1;
            let effectsCounterId = 0;
            let StartInterVal;
            let bgShow= 1;
            jQuery.fx.interval = 20;
            let __InitLoader = function() {
                $(objElement).children('DIV').each(function() {
                    $(this).addClass('js_transformer-' + childClassId);
                    imgSrcArray[childClassId] = $(this).find('img').attr('src');
                    titleContentArray[childClassId] = $(this).find('p').css({
                        "z-index": "-1"
                    }).html();
                    $(this).find('p').remove();
                    $(this).find('img').css({
                        "position": "absolute",
                        "z-index": "-1"
                    });
                    childClassId++
                })
            };
            //切片图设置样式
            let __C_M_Bx = function(__Ix, __Height, __Width, __IMG_Left, __IMG_Top, __Mask_Left, __Mask_Top) {
                $(".js_transformer-" + (__Ix) + "").append('<div class=js_mask-' + (childMaskId) + '></div>');
                $('.js_mask-' + (childMaskId) + '').css({
                    "margin-left": "" + __Mask_Left + "px",
                    "margin-top": "" + __Mask_Top + "px",
                    "height": "" + __Height + "px",
                    "width": "" + __Width + "px",
                    "background": "URL(" + imgSrcArray[__Ix] + ") no-repeat",
                    "background-position": "" + __IMG_Left + "px " + __IMG_Top + "px",
                    "position": "absolute",
                    "float": "left",
                    "z-index": "200"
                }).hide();
                childMaskId++
            };
            let __C_M_T_B = function(__Ix) {
                $(".js_transformer-" + (__Ix) + "").append('<div class="js_title"><div class="js_title_content">' + titleContentArray[__Ix] + '</div></div>');
                //todo:设置文本盒子内容样式
                $(".js_title_content").css({
                    "width": "80%",
                    "margin": "0"+" " +"auto",
                    "text-align":"center",
                    "font-family": "微软雅黑",
                    "font-size":".9rem",
                    "line-height":"30px"
                }).hide();
                $(".js_title_content span").css({
                    "color" : "red"
                });
                //todo:设置文本盒子样式
                $(".js_title").css({
                    "margin-left": "0px",
                    "margin-top": "" + __Get_Title_Top_Margin() + "px",
                    "height": "" + __Settings.TitleHeight + "px",
                    "width": "" + __Get_Title_Left_Margin() + "px",
                    "background-color": "rgba(0,0,0,.6)",
                     "position": "absolute",
                    "overflow":"hidden",
                    "z-index": "300"
                }).hide()
            };
            let __Get_Mask_Height = function() {
                return Math.ceil($(objElement).height() / __Settings.Rows)
            };
            let __Get_Mask_Width = function() {
                return Math.ceil($(objElement).width() / __Settings.Columns)
            };
            let __Get_Title_Top_Margin = function() {
                return Math.round($(objElement).height() - __Settings.TitleHeight)
            };
            let __Get_Title_Left_Margin = function() {
                if (__Settings.TitleWidth == 0) {
                    return Math.round($(objElement).width())
                } else {
                    return Math.round($(objElement).width() - __Settings.TitleWidth)
                }
            };
            let __Z_Index_Changer = function(__Ix) {
                let __Z_Index_Id = 0;
                $(objElement).children().each(function() {
                    $(this).css({
                        'z-index': '' + __Z_Index_Id + ''
                    });
                    __Z_Index_Id++
                });
                $(".js_transformer-" + (__Ix) + "").children().removeAttr('src').attr('src', '' + imgSrcArray[bgShow] + '');
                $(".js_transformer-" + (__Ix) + "").css({
                    'z-index': '100'
                })
            };
            let __Create_Mask_Factory = function(__Ix) {
                let __Get_Mask_Top = 0;
                let __Get_Mask_Left = 0;
                for (let j = 1; j <= __Settings.Rows; j++) {
                    for (let i = 1; i <= __Settings.Columns; i++) {
                        __C_M_Bx(__Ix, __Get_Mask_Height(), __Get_Mask_Width(), -__Get_Mask_Left, -__Get_Mask_Top, __Get_Mask_Left, __Get_Mask_Top);
                        __Get_Mask_Left = (__Get_Mask_Left + __Get_Mask_Width())
                    }
                    __Get_Mask_Left = 0;
                    __Get_Mask_Top = (__Get_Mask_Top + __Get_Mask_Height())
                }
                childMaskId = 1
            };
            let __Remove_Mask_Box = function(__Ix) {
                if (eventChecker) {
                    if (__Ix == 1) {
                        $(".js_transformer-" + ($(objElement).children().length) + "").children('DIV').remove()
                    } else {
                        $(".js_transformer-" + (__Ix - 1) + "").children('DIV').remove()
                    }
                } else {
                    eventChecker = true
                }
            };
            //todo:封装小格子动画效果
            let __M_A_F = function(__Ix) {
                __C_T_AnOut(bgShow);
                __Z_Index_Changer(__Ix);
                bgShow=__Ix;
                __Remove_Mask_Box(__Ix);
                __C_M_T_B(__Ix);
                __Create_Mask_Factory(__Ix);
                jineng_bg(__Ix);
                let __Children_Length_Id = 0;
                let __Per_Mask_InterVal_Speed = Math.round(((__Settings.Speed / 2) / $('.js_transformer-' + __Ix).children('DIV').length) / 2);
                let __Middle_Frame = Math.round($(objElement).children().length / 2);
                let __End_Frame = __Settings.Rows * __Settings.Columns * 3;
                let __Effect_Name = Effects_Maker();
                __C_T_An(__Ix);
                let __Interval = setInterval(function() {
                    try {
                        __A_E_F(__Effect_Name, __Children_Length_Id);
                        if (__Children_Length_Id == __End_Frame) {
                            clearInterval(__Interval)
                        }

                        __Children_Length_Id++
                    } catch (ex) {}
                }, __Per_Mask_InterVal_Speed);
            };
            let Effects_Maker = function() {
                let __Effect_Name = __Settings.Effects[effectsCounterId];
                if (effectsCounterId == __Settings.Effects.length) {
                    effectsCounterId = 0
                }
                effectsCounterId++;
                return __Effect_Name
            };
            let __A_E_F = function(__Effect_Name, __Childe_Id) {
                switch (__Effect_Name) {
                    case 'Optimus':
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Right')).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '-=100',
                            opacity: '0.5',
                            top: '+=50'
                        }, 200);
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Right')).animate({
                            left: '+=100',
                            opacity: '1',
                            top: '-=50'
                        }, 200);
                        break;
                    case 'Ironhide':
                        $('.js_mask-' + __Childe_Id).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '+=50'
                        }, 200);
                        $('.js_mask-' + __Childe_Id).animate({
                            left: '-=50'
                        }, 200);
                        break;
                    case 'Scorponok':
                        $('.js_mask-' + __Childe_Id).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '-=50'
                        }, 200);
                        $('.js_mask-' + __Childe_Id).animate({
                            left: '+=50'
                        }, 200);
                        break;
                    case 'Megatron':
                        $('.js_mask-' + __Childe_Id).slideDown(100);
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '-=50'
                        });
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '+=50'
                        });
                        break;
                    case 'Jazz':
                        $('.js_mask-' + __Childe_Id).show(200);
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '+=100'
                        });
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '-=100'
                        });
                        break;
                    case 'Starscream':
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).slideUp();
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).slideDown();
                        break;
                    default:
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '+=100',
                            top: '-=50'
                        }, 200);
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).animate({
                            left: '-=100',
                            top: '+=50'
                        }, 200);
                        break
                }
            };
            let __SpecialEffects_Boxer = function(__id, __Mode) {
                let __boxer = [];
                let __animat_array = [];
                let __start_index = 1;
                let __boxerInex = 1;
                for (let i = 1; i <= __Settings.Rows; i++) {
                    __boxer[i] = new Array(__Settings.Columns);
                    let __resset_index = 1;
                    for (let j = __start_index; j <= (__Settings.Columns + __start_index); j++) {
                        __boxer[i][__resset_index] = j;
                        __resset_index++
                    }
                    __boxer[i].reverse();
                    __start_index = __start_index + __Settings.Columns
                }
                if (__Mode == 'Right') {
                    for (let k = 1; k <= __Settings.Columns; k++) {
                        for (let s = (__Settings.Rows); s >= 1; s--) {
                            __animat_array[__boxerInex] = __boxer[s][k];
                            __boxerInex++
                        }
                    }
                    return __animat_array[__id]
                } else if (__Mode == 'Left') {
                    for (let k = 1; k <= __Settings.Columns; k++) {
                        for (let s = 1; s <= __Settings.Rows; s++) {
                            __animat_array[__boxerInex] = __boxer[s][k];
                            __boxerInex++
                        }
                    }
                    return __animat_array[__id]
                } else if (__Mode == "Array") {
                    return __boxer
                }
            };
            let __C_T_An = function(__Ix) {
                let js_title = $(".js_transformer-" + (__Ix) ).find('.js_title');
                let js_title_content = $(".js_transformer-" + (__Ix) ).find('.js_title_content');
                let speed=__Settings.Speed - 2000;
                js_title.fadeIn(1500);
                js_title_content.fadeIn(1500);
            };
            let __C_T_AnOut=function(__Ix){
                let js_title = $(".js_transformer-" + (__Ix) ).find('.js_title');
                let js_title_content = $(".js_transformer-" + (__Ix) ).find('.js_title_content');
                js_title.fadeOut("slow");
                js_title_content.fadeOut("slow");
            };
            let __S_S_An = function() {
                 StartInterVal = setInterval(function() {
                     let n = $(objElement).children().length;
                     if (parentId > n) {
                         parentId = 1;
                     }
                    __M_A_F(parentId);
                     parentId++;
                    if (parentId > n) {
                        parentId = 1;
                        clearInterval(StartInterVal);
                        __S_S_An();
                    }
                }, __Settings.Speed);
            };
            $(objElement).hover(function(){
                clearInterval(StartInterVal);
                },function(){
                __S_S_An();
                });
            function jinengdianji(){
                clearInterval(StartInterVal);
                let a=$(this).data("numb");
                $(".js_transformer-" + (bgShow) ).find('.js_title').remove();
                $(".js_transformer-" + (a) ).find('.js_title').remove();
                parentId=a;
                __M_A_F(a);
                 parentId++;
                __S_S_An();
            }
            function jineng_bg(a){
                $("#jiNengBtn_"+a).show().siblings().hide();
            }
            $("div[id^=JNBtn_]").click(jinengdianji);
            $(window).load(function() {
                $(objElement).children('DIV').show();
                __InitLoader();
                __M_A_F(parentId);
                parentId++;
                __S_S_An()
            });

        });
    };

})(jQuery);