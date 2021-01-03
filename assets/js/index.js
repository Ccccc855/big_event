$(function(){
        fn()
        // 退出功能
    var layer = layui.layer
    $('#tc').click(function(){
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储的 token
            localStorage.removeItem('token')
            // 跳转到注册页
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

function fn(){
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            if(res.status!==0){
                return layui.layer.msg('获取失败')
            }
            fnn(res.data)
        },
        // 无论成功还是失败 都会回调这个函数
     
    });
}
// 渲染头像 信息
function fnn (uname){
   var nm = uname.nickname || uname.username
   $('#welcome').html('欢迎 &nbsp&nbsp' + nm)
   if(uname. user_pic!== null) {
       $('.layui-nav-img').attr('src',uname. user_pic).show()
       $('.text-tx').hide()
   }else {
    $('.layui-nav-img').hide()
    var a = nm[0].toUpperCase()
    $('.text-avatar').html(a).show()
   }
}

