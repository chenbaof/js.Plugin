if (typeof jQuery === "undefined") {
  throw "modalDialog requires jquery module to be loaded";
}
(function ($) {
  
  $.extend(true, window, {
    ModalDialog: {
      MessageBox: messagebox
    }
  });
  function messagebox(options) {
    var defaults = {
      width:400,
      height:144,
      callback:function(){return false;}
    }
  function init(){
    options = $.extend({}, defaults, options);
    var mask = $("<div class='mask' id='mask'></div>");
    $("body").append(mask);
    var modalDialog = $("<div class='modal-dialog'></div>");
    var mdTitle = $("<div id='modalDialogTitle' class='modal-title'><em>"+options.title+"</em></div>");
    var mdClose = $("<a class='modal-close'>×</a>");
    mdTitle.append(mdClose);
    var mdWrap = $("<div id='modalDialogwrap' class='modal-wrap'></div>");
    var temp = options.msg!==undefined?options.msg:"";
    var mdTxt = $("<div class='modal-txt'>"+temp+"</div>");
    var mdInput = $("<input type='text' class='modal-input'/>");
    var btnWrap = $("<div></div>");
    var okBtn =$("<a href='javascript:;' class='modal-btn'>确定</a>");
    var cancelBtn =$("<a href='javascript:;' class='modal-btn'>取消</a>");
    var mdIframe = $("<iframe style='width:"+(options.width-10)+"px;height:"+(options.height-46)+"px;' allowtransparency='true' scrolling='auto' frameborder='0' src='"+options.src+"'></iframe>");
    btnWrap.append(okBtn);
    if (options.type==="confirm") {
      btnWrap.append(cancelBtn);
      okBtn.click(function(){
        mdClose.trigger("click");
        var continues = options.callback();
        return continues;
      })
    }else if(options.type==="prompt"){
      mdWrap.append(mdInput);
      btnWrap.append(cancelBtn);
      okBtn.click(function(){
        options.dataArr.length=0;
        var inputVal = $(".modal-input").val();
        if($.trim(inputVal)==""){return;}
        options.dataArr.push(inputVal);
        mdClose.trigger("click");
        var continues = options.callback();
        return continues;
      })
    }else{
      okBtn.click(function(){
        mdClose.trigger("click");
      })
    }
    if(options.type==="iframe"){
      mdWrap.append(mdIframe);
      modalDialog.append(mdTitle).append(mdWrap);
    }else{
      mdWrap.append(mdTxt).append(btnWrap);
      modalDialog.append(mdTitle).append(mdWrap);
    }
    $("body").append(modalDialog);
    var mdWidth = "-"+options.width/2+"px";
    var mdHeight = "-"+options.height/2+"px";;
    modalDialog.css({width:options.width+"px",height:options.height+"px",marginLeft:mdWidth,marginTop:mdHeight});
    mdClose.click(function(){
      modalDialog.addClass("animated-hide");
      setTimeout(function(){modalDialog.remove();},500)
      mask.remove();
    });
    cancelBtn.click(function(){
        mdClose.trigger("click");
      })
    mask.click(function(){
      var count = 0;
      var timer = setInterval(function(){
        count++;
        modalDialog.toggleClass("modal-scale");  
        if(count==1){
          clearInterval(timer);
          count=0;
        }
      },50);
    });
  };
  $.extend(this, {
    "modalDialog": "1.0"
  });

  init();
  } 
  
}(jQuery));
