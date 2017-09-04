(function ($) {
    $.extend({
        'mouseMoveShow': function (obj) {
            var doc = $(document);
            var pageX = 0;
            var show = false;
            var menuRight = $(obj);//右键菜单的对象

            doc.mousemove(function (e) {
                let headerWidth =$('.page-head').height()+10;//padding2*5
                let pagesideWidth =$('.page-side').width();
                let tabWidth =$('.el-tabs__item').width()+34;// padding2*16=32,border2*1=2
                let tabbarWidth =$('.el-tabs__item').length*tabWidth;
                let tabbarHeight =$('.el-tabs__nav').height();

                // 菜单栏宽<=鼠标横坐标<=菜单栏宽+所有标签的长；头部栏高<=鼠标纵坐标<=头部栏高+标签栏高；
                if(e.pageX >= pagesideWidth &&e.pageX <= pagesideWidth+tabbarWidth && e.pageY >= headerWidth && e.pageY <= headerWidth+tabbarHeight){
                    show = true;
                    let k = parseInt((e.pageX-pagesideWidth) / tabWidth );//判断鼠标在第几个tab里
                    pageX = tabWidth*k + 2*tabWidth;//右键菜单的横坐标
                    document.oncontextmenu = function () {return false;}//禁用右键
                } else{
                    show = false;
                    document.oncontextmenu = function () {return true;}
                }
                if (pageX + menuRight.width() >= doc.width()) {//不够位置的时候，菜单栏往左边放
                    pageX = pageX - menuRight.width() - 5;
                }
                doc.on({
                    "mousedown": function (e) {
                        if (3 == e.which && show === true) {//右点击
                            menuRight.css({'left': pageX,'top': 30}).show();
                        } else{
                             menuRight.hide();
                        }
                    },
                    "click": function () {//单击
                        menuRight.hide();
                    }
                });
            });
        }        
    });

})(jQuery);