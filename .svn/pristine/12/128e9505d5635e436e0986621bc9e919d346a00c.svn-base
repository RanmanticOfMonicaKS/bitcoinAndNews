
let b_url  = 'http://192.168.3.206:8080/';

// 1. 处理回退按钮监听逻辑，避免退回root屏
const fixRootBack = () => {
    let flag = false ;
    return api.addEventListener({
        name: 'keyback'
    }, function(ret, err){
        if(!flag) {
            api.toast({
                msg: api.appName+': 3s内再次点击可退出应用...',
                duration: 2000,
                location: 'bottom'
            });
            flag = true;
            setTimeout(() => {
                flag = false;
            }, 2500);
        } else {
            api.closeWidget({
                slient:true
            });
        }
    });
}

// 2. 修复页面高度 

const fixHeight = () => {
    let headerHi = $api.offset($api.dom('.header')).h;
    console.log(JSON.stringify(headerHi));
    $('.main').css({ "height":api.frameHeight - headerHi });
}

// 3. 封装ajax
const b_ajax =async (url,data) => {
    return new Promise((resolve,reject) => {
        api.ajax({
            url,
            method: 'post',
            timeout: 15,
            dataType: 'json',
            returnAll:false,
            data,
        },function(ret,err){
            if (ret) {
                resolve(ret);
            } else {
                api.alert({
                    msg:('错误码：'+err.code+'；错误信息：'+err.msg+'网络状态码：'+err.statusCode)
                });
                reject(err);
            };
        });
    })
}

// 根巨数据渲染模板的函数 要求模板和容器css类名和id名一致
const b_temp = (container,data) => {
        const temp = doT.template($('#'+container).text()); // 返回一个函数
        let s = temp(data);
        $("."+container).append(s);
}


   // 获取数据渲染 默认main容器
   const b_data_page = async (url,data) => {
    try {  
        let res = await b_ajax(url, data);
        console.log(JSON.stringify(res));
        if(res.bq_param && res.bq_param.total>0){
            let tempData = [];
            if(res.bq_param.total == 1) {

                 tempData = res.bq_param.records[0];
            } else {
                 tempData = res.bq_param.records;
                 if(api.winName === 'b_my_shoucang') {
                     //筛选
                     tempData = tempData.filter(item => item.b_news_sc == 1);
                 }
                 if(api.winName === 'b_my_community') {
                    tempData = tempData.filter(item => item.comsc == 1);

                 }
            }
            console.log(JSON.stringify(tempData));
            console.log(JSON.stringify(api.frameName)+'-----'+JSON.stringify(api.winName));
            if(api.frameName) {
                $api.setStorage(api.frameName, tempData);
            }
            if(api.winName) {
                $api.setStorage(api.winName, tempData);
            }
            b_temp('main',tempData);

        } else {
            api.toast({
                msg: '暂无数据',
                duration: 2000,
                location: 'bottom'
            });
        }
    } catch (error) {
        api.toast({
            msg: '网络出错~',
            duration: 2000,
            location: 'bottom'
        });
    }
}

// 5. 检测提示如果请求超时，或其他原因造成页面没有渲染，进行提示
const errorTest = () => {
    setTimeout(() => {      
        let html =  $('.main').html();
        if(html == '') {
            return false;
        }
    }, 5000);
}

// 跳转固定id 社区
const openComunityId = (id) => {
    let winName = api.frameName;
    api.openWin({
        name: 'b_community_detail',
        url: 'b_community_detail.html',
        bounces: false,
        pageParam: {id,winName},
    });
}
// 跳转新闻详情
const openDetailNews = (id) => {
    api.openWin({
        name: 'b_news_detail',
        url: 'b_news_detail.html',
        pageParam: {id},
    });
}


// 获取YYMM格式的当前时间
const  b_getNowTime = () => {
    const date = new Date();
    let y = date.getFullYear() +'';
    let m = (date.getMonth() +1)+'';
    let d = date.getDate() + '';
    m = m.padStart(2,'0');
    d = d.padStart(2,'0');
    console.log(JSON.stringify(y)+'---'+JSON.stringify(m)+'----'+JSON.stringify(d));
    let str = y+'-'+m+'-'+d;
    return str;
}