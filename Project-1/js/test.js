/**
 * Created by ada on 2016/8/5.
 *
 */
var index = 1, //当前选中对象的位置
    fast,  //在哪个位置开始加速
    num = 6, //共有多少个奖品
    cycle, //转动多少圈
    speed = 300, //开始的速度
    flag = false, //正在抽奖的标志
    lukey, //中奖号码，由后台产生
    award, //奖品名称
    lottery; //抽奖的对象


//开始抽奖
function choujiang() {
    if (flag) {
        alert('正在抽奖，请等待')
        return void(0);
    }
    flag = true;
    index = 1;//当前选中位置
    fast = rand(3, 6);//从哪个位置开始加速
    cycle = rand(3, 5);//转动多少圈
    speed = 300;//开始速度
    var userid = 1; //获取用户ID
    showJp();
   /* $.ajax({
        type: 'POST',
        url: url,//后台地址
        dataTyps: 'json',
        timeout: 20000,
        cache: false,
        beforeSend: function () {//提交之前

        },
        error: function () {//出错
            if (status == 4) {//错误代码
                alert('请检查您的网络连接!');
                flag = false;
            }
        },
        success: function (res) {//成功
            if (typeof (res.status) != 'undefined') {
                luck = res.num;//奖品的号码
                award = res.name;//奖品的名称
                showJp();
            } else {
                flag = false;
                alert(res.err);
            }
        }
    });*/
}

//产生随机数
function rand(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

//抽奖效果的展示
function showJp() {

    lukey=5;
    award="test";

    if (index > num) {
        index = 1;
        cycle--;
    }

    //设置图片透明度来实现奖品滚动
    $('.lottery').css('opacity',0);
   // $(".lottery1 img").css('opacity', 1);
   // $(".lottery" +index).html($('<img src="./images/slot'+index+'.png" alt="奖品1" style="display: none;" >'));
   // $(".lottery img").css('display', 'none');
    console.log(index);
    $('.lottery'+index).css('opacity',1)
    //$(".lottery"+index).css('display','block');
   // $(".lottery").each(function(){
   //     $(".lottery" +index).html($('<img src="./images/slot'+index+'.png" style="opacity: 1;" >'));
   // })

   // $(".lottery" +index).html($('<img src="./images/slot'+index+'.png" style="opacity: 1;" >'));
    if (index > fast) speed = 100;//开始加速
    if (cycle == 0 && lukey - index < rand(2, 5)) speed = speed + 200;//开始减速
    if (cycle <= 0 && index == lukey) {//结束抽奖，选中号码
        setTimeout(function () {
            //$(".lottery" +index).html($('<img src="./images/slot'+index+'.png" style="display: block;" >'));
           // $(".lottery" +index).css('display','block');

            alert('恭喜您获得:' + award);
            //移除抽奖事件
            $('#button').removeAttr("onClick");
        }, 1200);
        flag = false;
    } else {
        lottery = setTimeout(showJp, speed);
    }
    index++;
}