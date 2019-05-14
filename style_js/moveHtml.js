if ($.fn.datagrid) {
    $.fn.datagrid.defaults.method = 'get';
    $.fn.datagrid.defaults.scrollbarSize = 8;
    $.fn.datagrid.defaults.singleSelect = true;
    // $.fn.datagrid.defaults. pagination = true;
    $.fn.datagrid.defaults.nowrap = false;
    $.fn.datagrid.defaults.striped = false;
    $.fn.datagrid.defaults.fitColumns = true;
    $.fn.datagrid.defaults.rownumbers = false;
    $.fn.datagrid.defaults.autoRowHeight = true;
    $.fn.datagrid.defaults.loadMsg = '数据加载中,请稍候...'
}
//设置默认的分页参数
if ($.fn.pagination) {
    $.fn.pagination.defaults.pageSize = 0;
    $.fn.pagination.pageList = [10, 15, 20, 30];//这里一定要有，不然上面的不起效
//设置分页显示文字
    $.fn.pagination.defaults.total = 0;
    $.fn.pagination.defaults.pageSize = 0;
    $.fn.pagination.defaults.beforePageText = '第';
    $.fn.pagination.defaults.afterPageText = '页,共{pages}页';
    $.fn.pagination.defaults.displayMsg = '当前显示{from}到{to}条,共{total}条记录';
//组件类型和按钮数量
    $.fn.pagination.defaults.layout = ['first', 'links', 'last', 'list', 'sep', 'manual', 'efresh'];
    $.fn.pagination.defaults.links = 5;
}
if ($.fn.window) {
    $.fn.window.defaults.shadow = false;
    $.fn.window.defaults.modal = true;
    $.fn.window.defaults.collapsible = false;
    $.fn.window.defaults.minimizable = false;
    $.fn.window.defaults.maximizable = false;
    $.fn.window.defaults.draggable = false;
}
$(function () {
    $.fn.window.defaults.shadow = false;
    $.fn.datagrid.defaults.scrollbarSize = 8;
    // 替换标签
    // if($(".edit_form").length){
    //     var $form = $(".edit_form");
    //     var tableStr = new RegExp('table','ig');
    //     var tbodyStr = new RegExp('tbody','ig');
    //     var trStr = new RegExp('tr','ig');
    //         var html = $form.prop("outerHTML");
    //     var tableHtml =  html.replace(tableStr,"div");
    //     var trHtml= tableHtml.replace(trStr,"p");
    //     var tbodyHtml =  trHtml.replace(tbodyStr,"div");
    //     $form.replaceWith(tbodyHtml);
    // };
    // 重置表格
    $('.cont-area').removeAttr('style')
    $('body').removeAttr('style')
    $($("body").children().get(0)).removeClass().addClass('cont-area')
    $('.easyui-tabs').removeAttr('style')
    $('.tabs-header').removeAttr('style')
    $('.tabs-wrap').removeAttr('style')
    $('.page_body').removeAttr('style')
    $('.cont-area>br').remove()
    function datagridW(){
        let documentH = $('.cont-area').height()
        let crumbsH = $('#crumbs').outerHeight()
        let searchH = $('.query-cond').outerHeight()
        let tbH = $('#tb').outerHeight()
        let toolbarH = $('#toolbar').outerHeight()
        let datagridH ;
        if( $('.datagrid-wrap').find('#tb').length){
            datagridH = documentH - crumbsH - searchH
        }else {
            datagridH = documentH - crumbsH - searchH - tbH - toolbarH
        }
        $('#dg').datagrid('resize',{ width: '100%'});
        $('.cont-area>.tableWrapper #dg').datagrid('resize',{ width: '100%',height: datagridH + 'px'});
        if($('.tableWrapper #dg1').length){
            $('.tableWrapper #dg').datagrid('resize',{ width: '100%',height: (datagridH -40)+ 'px'});
            $('.tableWrapper #dg1').datagrid('resize',{ width: '100%',height: (datagridH -40 )+ 'px'});
        }
        // $('#dg').datagrid('resize',{ width: '100%'});
        if(!$('.datagrid-wrap').find('.datagrid-pager').length){
            loadStyleString(".tableWrapper .easyui-fluid{ border-bottom:1px solid #ccc}");
        }else {
            loadStyleString(".tableWrapper .easyui-fluid{border:none}");
        }
        $('.easyui-tabs').tabs('resize',{ width: '100%'})
    }
    // 动态添加伪元素  用于显示表格边框
    function loadStyleString(css) {
        let style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch(ex) {
            style.styleSheet.cssText = css;
        }
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }
    let interval = setInterval(function () {
        if ($('.cont-area>.tableWrapper #dg')) {
            clearInterval(interval);
        }
        datagridW()
        if ($('.tableWrapper .datagrid-wrap').attr('style')) {
            clearInterval(interval);
        }
    }, 100)
    // 点击查询防止表格按照给的行内样式重构
    $('#queryButton').bind('click', function(){
        setTimeout(function () {
            $('#dg').datagrid('resize',{ width: '100%'});
            datagridW()
        })
    })
    $('#searchErrBtn').bind('click', function(){
        setTimeout(function () {
            datagridW()
        })
    })
    $('.buttonBox').on('click','a', function(){
        setTimeout(function () {
            $('#dg').datagrid('resize',{ width: '100%'});
        })
    })
    // 重置表单
    $('.edit_form table').attr('style','')
    // 清空下拉框值第一值为空的元素
    $("body").on("click", '.textbox.combo', function (event) {
        var optionOne = $('.combo-panel')
        optionOne.each(function (i, val) {
            var str = $(val).children().eq(0).text()
            if (str == '') {
                $(val).children().eq(0).remove()
            }
        })
    })
    $("body").on("click", '.textbox-addon', function (event) {
        var optionOne = $('.combo-panel')
        optionOne.each(function (i, val) {
            var str = $(val).children().eq(0).text()
            if (str == '') {
                $(val).children().eq(0).remove()
            }
        })
    })
    // 弹窗函数
    $('body').on('DOMNodeInserted','.window',function(){
        setTimeout(function () {
            // 弹框内容包含换行时   这个事件有问题 弹窗未关闭前会一遍遍的执行  没想到好的监听办法
            let messagerStr = $($(".messager-body").children("div").get(0)).text()
            let messagerStr1 = $($(".messager-body").children("div").get(1)).text()
            $($(".messager-body").children("div").get(0)).html('<pre>'+ messagerStr+ '</pre>')
            $($(".messager-body").children("div").get(1)).html('<pre>'+ messagerStr1+ '</pre>')
            $('.window-shadow').removeAttr('style')
        })
    });
    function resizepPosition() {
        $('body').find('.panel.window').each(function (i,val) {
            var pageWidth = window.innerWidth;
            var pageHeight = window.innerHeight;
            var sunW = $(val).outerWidth()
            var sunH = $(val).outerHeight()
            var left =(pageWidth - sunW) /2 - 90 + 'px';
            var top = (pageHeight - sunH)/2 - 100 + 'px';
            if(val.style['display'] == 'none'){
                val.style['cssText'] = 'display: none; width: '+ sunW +'; left: '+ left+'; top: '+ top +'; z-index: 9002;'
            }else {
                val.style['cssText'] = 'display: block; width: '+ sunW +'; left: '+ left+'; top: '+ top +'; z-index: 9995;'
            }
        })
    }
    // 监听视口改变
    $(window).resize(function(){
        datagridW()
        resizepPosition()
    });
})