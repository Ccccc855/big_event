$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到16位，且不能有空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    //    监听注册表单
    $('#layui-2').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#layui-2 [name = username]').val(),
            password: $('#layui-2 [name = password]').val()
        }
        console.log(data);
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_login').click()
        })

       

    });


         //   监听 登陆表单
    $('#layui-1').on('submit',function (e) {
        e.preventDefault()
        console.log(123);
        $.ajax({
            url: "/api/login",
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                 if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        });
    })
})