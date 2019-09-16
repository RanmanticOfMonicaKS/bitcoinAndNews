/**
 * aui-popup.js
 * @author 流浪男
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function( window, undefined ) {
    "use strict";
    var auiToast = function() {
        // this.create();
    };
    var isShow = false;
    auiToast.prototype = {
        create: function(params,callback) {
            var self = this;
            var toastHtml = '';
            switch (params.type) {
                case "text":
                    var iconHtml = '';
                    break;
                case "success":
                    var iconHtml = '<i class="fa fa-check-circle-o"></i>';
                    break;
                case "warning":
                    var iconHtml = '<i class="fa fa-exclamation-triangle "></i>';
                    break;
                case "fail":
                    var iconHtml = '<i class="aui-iconfont aui-icon-close"></i>';
                    break;
                case "custom":
                    var iconHtml = params.html?params.html:'';
                    break;
                case "loading":
                    var iconHtml = '<div class="aui-loading"></div>';
                    break;
            }

            var titleHtml = params.title ? '<h5 class="myToast">'+params.title+'</h5>'+iconHtml : '';
            toastHtml = '<i class="myToastCon">'+titleHtml+'</i>';
            if(document.querySelector(".myToastCon"))return;
            document.body.insertAdjacentHTML('beforeend', toastHtml);
            var duration = params.duration ? params.duration : "2000";
            self.show();
            if(params.type == 'loading'){
                if(callback){
                    callback({
                        status: "success"
                    });
                };
            }else{
                setTimeout(function(){
                    self.hide();
                }, duration)
            }
        },
        show: function(){
            var self = this;
            document.querySelector(".myToastCon").style.display = "block";
            document.querySelector(".myToastCon").style.marginTop =  "-"+Math.round(document.querySelector(".myToast").offsetHeight/2)+"px";
            if(document.querySelector(".myToastCon"))return;
        },
        hide: function(){
            var self = this;
            if(document.querySelector(".myToastCon")){
                document.querySelector(".myToastCon").parentNode.removeChild(document.querySelector(".myToastCon"));
            }
        },
        remove: function(){
            if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
            if(document.querySelector(".aui-mask")){
                document.querySelector(".aui-mask").classList.remove("aui-mask-out");
            }
            return true;
        },
        text:function(params,callback){
            var self = this;
            params.type = "text";
            return self.create(params,callback);
        },
        success: function(params,callback){
            var self = this;
            params.type = "success";
            return self.create(params,callback);
        },
        warning: function(params,callback){
            var self = this;
            params.type = "warning";
            return self.create(params,callback);
        },
        fail: function(params,callback){
            var self = this;
            params.type = "fail";
            return self.create(params,callback);
        },
        custom:function(params,callback){
            var self = this;
            params.type = "custom";
            return self.create(params,callback);
        },
        loading:function(params,callback){
            var self = this;
            params.type = "loading";
            return self.create(params,callback);
        }
    };
    window.auiToast = auiToast;
})(window);
